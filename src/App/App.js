import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import './App.css';

// luck

const App = props => {
    const [data, setData] = useState([]);
    const [iniData, setIniData] = useState([]);
    const [priceKind, setPriceKind] = useState('Ruble');
    const getData = () => {
        $.post("https://krapipl.imumk.ru:8443/api/mobilev1/update",
            { "data": "" },
            function (response, status) {
                var elements = JSON.parse(JSON.stringify(response)).items;
                setIniData(elements);
                setData(elements);
            });
    }

    useEffect(() => {
        getData()
    }, [])

    const onChangeSubject = e => {
        $('#genre').val('Все жанры');
        $('#grade').val('Все классы');
        $('#lookingFor').val('');
        let newData = [];
        if (e.target.value === 'Все предметы') {
            newData = iniData
        } else {
            iniData.forEach(function (item, index) {
                if (item.subject === e.target.value) {
                    newData.push(item)
                }
            })
        }
        setData(newData);
    }

    const onChangeGenre = e => {
        $('#subject').val('Все предметы');
        $('#grade').val('Все классы');
        $('#lookingFor').val('');
        let newData = [];
        if (e.target.value === 'Все жанры') {
            newData = iniData
        } else {
            iniData.forEach(function (item, index) {
                if (item.genre === e.target.value) {
                    newData.push(item)
                }
            })
        }
        setData(newData);
    }

    const onChangeClass = e => {
        $('#subject').val('Все предметы');
        $('#genre').val('Все жанры');
        $('#lookingFor').val('');
        let newData = [];
        if (e.target.value === 'Все классы') {
            newData = iniData
        } else {
            iniData.forEach(function (item, index) {
                if (item.grade === e.target.value) {
                    newData.push(item)
                }
            })
        }
        setData(newData);
    }

    const titleSearch = e => {
        $('#subject').val('Все предметы');
        $('#genre').val('Все жанры');
        $('#grade').val('Все классы');
        let newData = [];
        if ($('#lookingFor').val() === '') {
            newData = iniData
        } else {
            iniData.forEach(function (item, index) {
                if (item.title.startsWith($('#lookingFor').val())) {
                    newData.push(item)
                }
            })
        }
        setData(newData);
    }

    const onChangeRadio = e => {
        setPriceKind(e.target.value);
    }
    const showHideRuble = (priceKind === 'Ruble') ? "d-block" : "d-none";
    const showHideBonus = (priceKind === 'Bonus') ? "d-block" : "d-none";

    return (
        <div>
            <div style={{ marginLeft: "auto", marginRight: "auto", width: "760px" }}>
                <div className="inLine" >
                    <select id="subject" onChange={onChangeSubject.bind(this)}>
                        <option>Все предметы</option>
                        <option>Алгебра</option>
                        <option>Биология</option>
                        <option>География</option>
                        <option>Геометрия</option>
                        <option>Информатика</option>
                        <option>История</option>
                        <option>Литература</option>
                        <option>Математика</option>
                        <option>Обществознание</option>
                        <option>Окружающий мир</option>
                        <option>Робототехника</option>
                        <option>Русский язык</option>
                        <option>Физика</option>
                        <option>Химия</option>
                    </select>
                </div>&nbsp;&nbsp;&nbsp;&nbsp;
                <div className="inLine" >
                    <select id="genre" onChange={onChangeGenre.bind(this)}>
                        <option>Все жанры</option>
                        <option>Задачник</option>
                        <option>Подготовка к ВПР</option>
                        <option>Подготовка к ЕГЭ</option>
                        <option>Рабочая тетрадь</option>
                    </select>
                </div>&nbsp;&nbsp;&nbsp;&nbsp;
                <div className="inLine" >
                    <select id="grade" name="grade" onChange={onChangeClass.bind(this)}>
                        <option>Все классы</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                        <option>7</option>
                        <option>8</option>
                        <option>9</option>
                        <option>10</option>
                        <option>11</option>
                    </select>
                </div>&nbsp;&nbsp;&nbsp;&nbsp;
                <div className="inLine" >
                    <input type="text" id='lookingFor' style={{ width: "300px" }} autoComplete="off" />
                </div>&nbsp;&nbsp;
                <div className="fas fa-search" onClick={titleSearch.bind(this)} />
            </div>

            <div style={{ textAlign: "center" }}>
                <input type="radio" id="radioRuble" name="radioPrice" value="Ruble" onChange={onChangeRadio.bind(this)} checked={priceKind === 'Ruble'} />
                <label htmlFor="radioApple">Цена в рублях</label>
                <input type="radio" id="radioBonus" name="radioPrice" value="Bonus" onChange={onChangeRadio.bind(this)} checked={priceKind === 'Bonus'} />
                <label htmlFor="radioBanana">Цена в бонусах</label>
            </div>

            <div style={{ marginLeft: "auto", marginRight: "auto", width: "1100px", textAlign: "center" }}>
                {
                    data && data.length > 0 &&
                    data.map((item, i) =>
                        <div key={i} className="mat-card" >
                            <div className="mat-card-header" >
                                <div className="mat-card-title">{item.name}</div>
                            </div>
                            <div className="mat-card-content">
                                <img style={{ width: "100%" }} src={'/images/' + item.courseId + '.jpg'}></img>
                                <div>{item.subject}</div>
                                <div>{item.grade} класс</div>
                                <div>{item.genre}</div>
                                <div className={showHideRuble} id='priceSimple'>price: {item.price}</div>
                                <div className={showHideBonus} id='priceBonus'>priceBonus: {item.priceBonus}</div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default App;