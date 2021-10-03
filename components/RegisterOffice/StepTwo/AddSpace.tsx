import React, { FC } from 'react';
import { Col, Grid, TextInput, NumberInput, Title, Divider, Button, Center, Select } from '@mantine/core';
import { Field, useFormikContext } from 'formik';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { BsFillStarFill } from 'react-icons/bs'
import { MdErrorOutline, MdDoneAll } from 'react-icons/md'
import { useNotifications } from '@mantine/notifications';

import UploadImages from './UploadImages';

interface AddSpaceProps{
    spaces: any[],
    setSpaces: Function
}

const AddSpace: FC<AddSpaceProps> = (props, ref) => {
    const amenities = [
        "Protocolos de Bioseguridad",
        "Parqueadero para carros",
        "Parqueadero para motocicletas",
        "Parqueadero para bicicletas",
        "Conectividad a internet",
        "Cabinas telefonicas",
        "Impresora",
        "Espacio para mascotas",
        "Zona de recreación",
        "Espacio para maternidad",
        "Gimnasio",
        "Espacio de meditación",
        "Espacios al aire libre",
        "Servicio de cafetería",
        "Cocina",
        "Casillero personal",
        "Fotocopiadora",
        "Libreria",
        "Bar/Venta de alcohol disponible",
        "Espacio de Yoga"
    ]

    const comparePrices = (hour: number, day: number, week: number, month: number) => {
        if(hour <= day){
            if(day <= week){
                if(week <= month){
                    return {error: false, message: null}
                }
                else{
                    return {error: true, message: "El precio por semana es mayor que el precio por mes. Por favor, corrige esto."}
                }
            }
            else{
                return {error: true, message: "El precio por día es mayor que el precio por semana. Por favor, corrige esto."}
            }
        }
        else{
            return {error: true, message: "El precio por hora es mayor que el precio por día. Por favor, corrige esto."}
        }
    }

    const uniqueField = (list: any[], field: string, value: any) => {
        for(let item of list){
            if(item[field] === value){
                return false
            }
        }
        return true
    }

    const formikContext = useFormikContext()
    const notifications = useNotifications()
    const { values } = formikContext
    const handleNewSpace = (values: any) => {
        if(!values.nameSpace){
            notifications.showNotification({
                title: 'Error', 
                message: `Introduce un nombre valido para tu espacio por favor`,
                color: 'pink', icon: <MdErrorOutline/>
            })
            return
        }
        else if(values.nameSpace.length < 5){
            notifications.showNotification({
                title: 'Error', 
                message: `Introduce un nombre valido para tu espacio por favor`,
                color: 'pink', icon: <MdErrorOutline/>
            })
            return
        }
        else if(!uniqueField(props.spaces, 'nameSpace', values.nameSpace)){
            notifications.showNotification({
                title: 'Error', 
                message: `Introduce un nombre unico para cada espacio por favor`,
                color: 'pink', icon: <MdErrorOutline/>
            })
            return
        }
        if(!values.typeSpace){
            notifications.showNotification({
                title: 'Error', 
                message: `Escoge una categoria para tu espacio por favor`,
                color: 'pink', icon: <MdErrorOutline/>
            })
            return
        }

        const pricesValidation = comparePrices(values.hourPrice, values.dayPrice, values.weekPrice, values.monthPrice)
        if(pricesValidation.error){
            notifications.showNotification({
                title: 'Error', 
                message: `${pricesValidation.message}`,
                color: 'pink', icon: <MdErrorOutline/>
            })
            return
        }
        if(!values.spaceImages || values.spaceImages.length < 1){
            notifications.showNotification({
                title: 'Error', 
                message: `Introduce una o más imagenes para cada espacio. 
                Sí ya las has agregado en el formulario, no olvides oprimir en "Guardar imagenes"`,
                color: 'pink', icon: <MdErrorOutline/>
            })
            return
        }
        console.log(values)
        props.setSpaces([...props.spaces, values])
        notifications.showNotification({
            title: 'Espacio añadido correctamente', 
            message: `Felicitaciones, tu espacio ha sido añadido exitosamente.
            Sí deseas, puedes seguir añadiendo más o puedes continuar
            el formulario.`,
            color: 'teal', icon: <MdDoneAll/>
        })
        formikContext.setFieldValue('spaceImages', [])
    }

    return (
        <div>
            <Title order={1}>Registra tus espacios</Title>
            <Divider margins="xs" label="Información básica" labelPosition="center" />
            <Grid>
                <Col span={12} md={6}>
                    <Field name="nameSpace">
                        {({ field, form, meta }: any) => (
                            <TextInput
                                value={field.value}
                                onChange={(event) => form.setFieldValue(field.name, event.target.value)}
                                onBlur={(event) => form.setFieldValue(field.name, event.target.value)}
                                onLoad={(event) => form.setFieldValue(field.name, '')}
                                placeholder="Nombre de tu espacio"
                                label="Nombre de tu espacio"
                                aria-label="My textarea" radius="md" size="md"
                                id="officeDescription"
                            />
                        )}
                    </Field>
                </Col>
                <Col span={12} md={6}>
                    <Field name="typeSpace">
                        {({ field, form, meta }: any) => (
                            <Select
                                data={
                                    ["Oficina privada", "Escritorio personal", "Sala de conferencias", "Espacio abierto"]
                                }
                                searchable
                                nothingFound="Escoge una de nuestras categorias permitidas, por favor"
                                value={field.value}
                                onChange={(event) => form.setFieldValue(field.name, event.valueOf())}
                                onBlur={(event) => form.setFieldValue(field.name, event.target.value)}
                                onLoad={(event) => form.setFieldValue(field.name, '')}
                                placeholder="Tipo de tu espacio"
                                label="Tipo de tu espacio"
                                aria-label="My textarea" radius="md" size="md"
                                id="officeDescription"
                            />
                        )}
                    </Field>
                </Col>
            </Grid>
            <Grid>
                <Col span={12} md={6}>
                    <Field name="capacitySpace">
                        {({ field, form, meta }: any) => (
                            <NumberInput
                                defaultValue={1}
                                value={field.value}
                                onChange={(event) => form.setFieldValue(field.name, Number(event.valueOf()))}
                                onLoad={(event) => form.setFieldValue(field.name, 1)}
                                placeholder="Capacidad de tu espacio"
                                label="Capacidad de tu espacio"
                                aria-label="My textarea" radius="md" size="md"
                                id="officeDescription"
                                min={1}
                            />
                        )}
                    </Field>
                </Col>
                <Col span={12} md={6}>
                    <Field name="availableSpace">
                        {({ field, form, meta }: any) => (
                            <NumberInput
                                defaultValue={1}
                                value={field.value}
                                onChange={(event) => form.setFieldValue(field.name, Number(event.valueOf()))}
                                onLoad={(event) => form.setFieldValue(field.name, 1)}
                                placeholder="Cupos disponibles actualmente"
                                label="Cupos disponibles actualmente"
                                aria-label="My textarea" radius="md" size="md"
                                id="officeDescription"
                                min={1}
                            />
                        )}
                    </Field>
                </Col>
            </Grid>
            <Divider margins="xs" label="Precios" labelPosition="center" />
            <Grid>
                <Col span={12}>
                    <Field name="hourPrice">
                        {({ field, form, meta }: any) => (
                            <NumberInput
                                defaultValue={10000}
                                step={1000}
                                value={field.value}
                                onChange={(event) => form.setFieldValue(field.name, Number(event.valueOf()))}
                                onLoad={(event) => form.setFieldValue(field.name, 10000)}
                                placeholder="Precio por hora"
                                label="Precio por hora"
                                aria-label="My textarea" radius="md" size="md"
                                id="officeDescription"
                                min={3000}
                            />
                        )}
                    </Field>
                </Col>
                <Col span={12}>
                    <Field name="dayPrice">
                        {({ field, form, meta }: any) => (
                            <NumberInput
                                defaultValue={50000}
                                step={10000}
                                value={field.value}
                                onChange={(event) => form.setFieldValue(field.name, Number(event.valueOf()))}
                                onLoad={(event) => form.setFieldValue(field.name, 10000)}
                                placeholder="Precio por día"
                                label="Precio por día"
                                aria-label="My textarea" radius="md" size="md"
                                id="officeDescription"
                                min={10000}
                            />
                        )}
                    </Field>
                </Col>
                <Col span={12}>
                    <Field name="weekPrice">
                        {({ field, form, meta }: any) => (
                            <NumberInput
                                defaultValue={400000}
                                step={1000}
                                value={field.value}
                                onChange={(event) => form.setFieldValue(field.name, Number(event.valueOf()))}
                                onLoad={(event) => form.setFieldValue(field.name, 10000)}
                                placeholder="Precio por semana"
                                label="Precio por semana"
                                aria-label="My textarea" radius="md" size="md"
                                id="officeDescription"
                                min={50000}
                            />
                        )}
                    </Field>
                </Col>
                <Col span={12}>
                    <Field name="monthPrice">
                        {({ field, form, meta }: any) => (
                            <NumberInput
                                defaultValue={1000000}
                                step={1000}
                                value={field.value}
                                onChange={(event) => form.setFieldValue(field.name, Number(event.valueOf()))}
                                onLoad={(event) => form.setFieldValue(field.name, 10000)}
                                placeholder="Precio por mes"
                                label="Precio por mes"
                                aria-label="My textarea" radius="md" size="md"
                                id="officeDescription"
                                min={200000}
                            />
                        )}
                    </Field>
                </Col>
            </Grid>
            <Divider margins="xs" label="Amenidades" labelPosition="center" />
            <Field name="nameAmenities">
                {({ field, form, meta }: any) => (
                    <Autocomplete
                        multiple
                        id="tags-filled"
                        options={amenities}
                        defaultValue={[]}
                        freeSolo
                        value={field.value}
                        onChange={(event, newInputValue) => {
                            form.setFieldValue(field.name, newInputValue)
                        }}
                        onLoad={(event) => form.setFieldValue(field.name, [])}
                        renderTags={(value: readonly string[], getTagProps) =>
                            value.map((option: string, index: number) => (
                                <Chip variant="filled" icon={<BsFillStarFill />} color="primary" label={option} {...getTagProps({ index })} />
                            ))
                        }
                        renderInput={(params) => {
                            return (
                                <TextField
                                    {...params}
                                    variant="standard"
                                    label="Amenidades"
                                    placeholder="Amenidades"
                                />
                            )
                        }}
                    />

                )}
            </Field>
            <Divider margins="xs" label="Imagenes" labelPosition="center" />
            <Grid>
                <Col span={12}>
                    <UploadImages />
                </Col>
            </Grid>
            <Center>
                <Button onClick={() => {handleNewSpace(values)}} color="teal">Añadir espacio</Button>
            </Center>
        </div>
    )
}

export default AddSpace