import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import './App.css';

const App = props => {
    const [data, setData] = useState([]);
    const [breweryName, setBreweryName] = useState([]);
    const getData = () => {
        fetch('breweries.json'
            , {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
            .then(function (response) {
                console.log(response)
                return response.json();
            })
            .then(function (myJson) {
                console.log(myJson);
                setData(myJson)
            });
    }

    useEffect(() => {
        getData()
    }, [])

    const onChange = e => {
        setBreweryName($('#brewery-name').val());
    }

    return (
        <div>
            <div style={{ marginLeft: "auto", marginRight: "auto", width: "440px" }}>
            Введите имя пивоварни (совпадающие по начальным буквам будут выделены зеленым): <input onChange={onChange.bind(this)} type="text" id='brewery-name' />
            </div>

            <div style={{ marginLeft: "auto", marginRight: "auto", width: "720px" }}>
                {
                    data && data.length > 0 &&
                    data.map((item, i) =>
                        <div key={i} className={$('#brewery-name').val().length>0 && item.name.startsWith($('#brewery-name').val()) ? "mat-card1" : "mat-card" }>
                            <div className="mat-card-header" >
                                <div className="mat-card-title">{item.name}</div>
                            </div>
                            <div className="mat-card-content">
                                <div>postal_code: {item.postal_code}</div>
                                <div>street: {item.street}</div>
                                <div>country: {item.country}</div>
                                <div>state: {item.state}</div>
                                <div>city: {item.city}</div>
                                <div>longitude: {item.longitude}</div>
                                <div>latitude: {item.latitude}</div>
                                <div>phone: {item.phone}</div>
                                <div>website: {item.website_url}</div>
                            </div>
                        </div>
                    )


                }
            </div>
        </div>
    );
}

export default App;