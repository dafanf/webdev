import React, {useState,useEffect} from "react";

import axios from "axios";

import { Button, Form, Container, Modal } from "react-bootstrap";

import {Entry} from "./single-entry.component";

const Entries = () => {

    const [entries, setEntries] = useState([]);
    const [refreshData, setRefreshData] = useState(false);
    const [changeEntry, setChangeEntry] =useState({"change": false, "id": 0});
    const [changeIngredient, setChangeIngredient] =useState({"change": false, "id": 0});
    const [newIngredientName, setNewIngredientName] = useState("");
    const [setAddNewEntry, setAddNewEntry] = useState(false);
    const [newEntry, setAddNewEntry] = useState({"dish": "", "ingredients": "", "calories": 0, "fat": 0});

    useEffect(() => {
        getAllEntries();
    }, [])

    if (refreshData){
        setRefreshData(false);
        getAllEntries();
    }
    return (
        <div>
            <Container>
                <Button onClick={()=> setAddNewEntry(true)}>Track today's calories</Button>
            </Container>
            <Container>
                {entries != null && entries.map((entry, i) => (
                    <Entry entryData={entry} deleteSingleEntry={deleteSingleEntry} setChangeIngredients={setChangeIngredient} setChangeEntry={setChangeEntry}></Entry>
                ))}
            </Container>
            <Modal show={addNewEntry} onHide={() => setAddNewEntry(false)}centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add Calorie Entry</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>dish</Form.Label>
                        <Form.Control onChange={(event) => {newEntry.dish = event.target.value}}></Form.Control>
                        <Form.Label>ingredient</Form.Label>
                        <Form.Control onChange={(event) => {newEntry.ingredients = event.target.value}}></Form.Control>
                        <Form.Label>calories</Form.Label>
                        <Form.Control onChange={(event) => {newEntry.calories = event.target.value}}></Form.Control>
                        <Form.Label>fat</Form.Label>
                        <Form.Control onChange={(event) => {newEntry.fat = event.target.value}}></Form.Control>
                    </Form.Group>
                </Modal.Body>
            </Modal>
        </div>
    );

    function AddSingleEntry(){
        setAddNewEntry(false);
        var url = "http://localhost:8080/entry/create";
        axios.post(url, {
            "ingredients": newEntry.ingredients,
            "dish" : newEntry.dish,
            "calories": newEntry.calories,
            "fat": parseFloat(newEntry.fat)
        }).then(response => {
            if (response.status == 200){
                setRefreshData(true)
            }
        })
    }
    
    function deleteSingleEntry(id){
        var url = "http://localhost:8080/entry/delete/" + id;
        axios.delete(url).then(response => {
            if (response.status == 200){
                setRefreshData(true)
            }
        })
    }
    
    function getAllEntries(){
        var url = "http://localhost:8080/entries";
        axios.get(url).then(response => {
            if (response.status == 200){
                setEntries(response.data);
            }
        }
    }
}