import { useState } from 'react';
import dayjs from 'dayjs';
import { NumberInput } from '@mantine/core';
import { Autocomplete } from '@mantine/core';
import { DateRangePicker } from '@mantine/dates';
import { Container, Row, Col } from 'react-bootstrap';
import { Button } from '@mantine/core';
import { SiGooglemaps } from 'react-icons/si'
import style from './StylesImput.module.sass';
import {IoPeopleOutline} from 'react-icons/io5'
import {BsCalendar} from 'react-icons/bs'
import {BiSearchAlt} from 'react-icons/bi'


const SearchImput = () => {
    const [value, setValue] = useState<[Date, Date]>([
        dayjs(new Date()).startOf('month').toDate(),
        dayjs(new Date()).startOf('month').add(4, 'days').toDate(),
    ]);
    return (
        <Container className={style.search}>
            <Row>
                {/* Selecting the city  */}
                <Col xs = {4}  className = {style.City}> 
                    <Autocomplete
                        placeholder="City"
                        variant="unstyled"
                        size="lg"
                        required
                        data={['Bogota', 'Medellin', 'Barranquilla', 'Cali']}
                        id="city"
                        icon={<SiGooglemaps />}
                        className = {style.City}
                    />
                </Col>
                {/* Calendar */}
                <Col xs = {4}  className = {style.Calendar}>
                    <DateRangePicker
                    icon={<BsCalendar/>}
                    dropdownType="modal"
                    placeholder="fechas"
                    variant="unstyled"
                    id="SearchDates"
                    size="lg"
                    inputFormat="DD-MM" />
                    {/* className = {style.Calendar} */}

                </Col>
                {/* Button for how many people */}
                <Col xs = {2}>
                    <NumberInput
                        icon = {<IoPeopleOutline/>}
                        placeholder="sillas"
                        size="lg"
                        defaultValue={undefined}
                        required
                        min={1}
                        hideControls
                        variant="unstyled"
                        id="SearchPeople"
                    />
                </Col>
                {/* Button for Search */}
                <Col xs = {2}>
                    <Button 
                    className={style.ButtonSearch} 
                    color="dark" 
                    radius="xl"
                    leftIcon = {<BiSearchAlt width={20} height={20}/>}
                    >
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}

export default SearchImput;