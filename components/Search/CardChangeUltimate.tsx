import React, { FC } from "react";
import { Carousel } from "primereact/carousel";
import { Card } from "@mantine/core";
import ImagesSlide from '../Search/ImagesSlide'
import { Container, Row, Col } from 'react-bootstrap'
import { useTheme } from '@mui/material/styles';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Divider, Group, Title, Text } from "@mantine/core"
import style from './Search.module.sass'
import { CardActionArea } from '@mui/material';
import { AiOutlineHeart } from 'react-icons/ai'
import { AiTwotoneHeart } from 'react-icons/ai'
import { useState } from 'react';
interface ImageProps {
	images ?: any[]
}

const CardChange: FC<ImageProps> = (props) => {
	const ButtonCorazon =
		<IconButton color="primary" aria-label="upload picture" component="span" >
			<AiOutlineHeart />
		</IconButton>
	// const Images = props.images

	const officeTemplate = (office: any) => {
		const allImages = office.images

		return (
			<div style={{ margin: '00px' }}>
				<Card style ={{ maxWidth: 350 }}>
					<CardActionArea>
						<ImagesSlide images={allImages} />
						<CardContent>
							<div>
								<Row>
									<Col xs={10}>
										<Typography gutterBottom variant="h5" component="div">
											{office.title}
											<Typography gutterBottom variant="body2" color="text.secondary">
												{office.direction}
											</Typography>
										</Typography>
									</Col>
									<Col xs={2}>
										{ButtonCorazon}
									</Col>
								</Row>
							</div>

							<Typography gutterBottom variant="body2" color="text.secondary">
									{office.description}
							</Typography>
							<div style={{ display: 'flex' }}>
								<Typography variant="h6" component="div" style={{ margin: 'auto' }}>
									{office.type}
								</Typography>
							</div>

							{/* Prices	 */}
							<div className={style.TextCard}>
								<Divider margins="xs" label="Precios" labelPosition="center" />
								{/* <Title order={3} >Precios</Title> */}
								<Group position="center" noWrap spacing="xs">
									<div>
										<Title order={5}>Hora</Title>
										<Text>${office.prices.priceHour/1000}K </Text>
									</div>
									<Divider orientation="vertical" margins="xs" />
									<div>
										<Title order={5}>Dia</Title>
										<Text>${office.prices.priceDay/1000}K</Text>
									</div>

									<Divider orientation="vertical" margins="xs" />
									<div>
										<Title order={6}>Semana</Title>
										<Text>${office.prices.priceWeek/1000}K</Text>
									</div>
									<Divider orientation="vertical" margins="xs" />
									<div>
										<Title order={5}>Mes</Title>
										<Text>${office.prices.priceMoth/1000000}M</Text>
									</div>
								</Group>
								<Divider margins="xs" label="Amenidades del espacio" labelPosition="center" />
								<Group>

								</Group>
							</div>
						</CardContent>
					</CardActionArea>
				</Card>

			</div>
		);
	};
	const offices = [
		{
			"id": "1000",
			"title": "Escritorio Personal",
			"image": "https://distintaslatitudes.net/wp-content/uploads/2017/03/shridhar-gupta-dZxQn4VEv2M-unsplash.jpg",
			"description": "Whether you’re an established enterprise or a growing startup, discover flexible spaces and solutions to move your business forward.",
			"images": [
				{
					"main": true,
					"src": "https://www.petguide.com/wp-content/uploads/2018/07/funniest-dog-breeds-pug.jpg",
					"id": 1
				},
				{
					"main": false,
					"src": "https://coworker.imgix.net/photos/colombia/bogota/selina-chapinero-cowork/3.jpg?w=580&h=323&q=90&auto=format&fit=crop&mark=/template/img/wm_icon.png&markscale=5&markalign=center,middle",
					"id": 1
				},
				{
					"main": false,
					"src": "https://coworker.imgix.net/photos/colombia/medellin/selina-medellin-cowork/2.jpg",
					"id": 1
				}
			],
			"price": "4000",
			"prices": {
				"priceHour": 5000,
				"priceDay": 30000,
				"priceWeek": 200000,
				"priceMoth": 1500000
			},
			"type": "Escritorio Personal",
			"quantity": 5,
			"cantidadPersonas": 2,
			"direction" : "Avenida 39 ## 92-78",
			"amenidades": [
				"Ascensor",
				"Playa",
				"parqueadero",
				"mascotas",
				"Wifi"
			]
		},
		{
			"id": "1001",
			"title": "Escritorio para 2 personas",
			"description": "We offer private offices, individual workstations and meeting rooms for independent professionals, entrepreneurs and small business owners in a building with high specifications of infrastructure and security",
			"image": "https://revistaaxxis.com.co/wp-content/uploads/2019/12/coworking.jpg",
			"images": [
				{
					"main": true,
					"src": "https://distintaslatitudes.net/wp-content/uploads/2017/03/shridhar-gupta-dZxQn4VEv2M-unsplash.jpg",
					"id": 1
				},
				{
					"main": false,
					"src": "https://revistaaxxis.com.co/wp-content/uploads/2019/12/coworking.jpg",
					"id": 1
				},
				{
					"main": false,
					"src": "https://coworker.imgix.net/photos/colombia/medellin/selina-medellin-cowork/2.jpg",
					"id": 1
				}
			],
			"price": "5000",
			"prices": {
				"priceHour": 3800,
				"priceDay": 56000,
				"priceWeek": 680000,
				"priceMoth": 2300000
			},
			"type": "Oficina Privada",
			"quantity": 2,
			"cantidadPersonas": 4,
			"direction" : "Calle 152 ## 92-32",
			"amenidades": [
				"Ascensor",
				"impresora",
				"parqueadero",
				"mascotas"
			]
		},
		{
			"id": "1002",
			"title": "Sala de coferencias",
			"description": "Whether you’re an established enterprise or a growing startup, discover flexible spaces and solutions to move your business forward.",
			"image": "https://coworker.imgix.net/photos/colombia/medellin/selina-medellin-cowork/2.jpg",
			"images": [
				{
					"main": true,
					"src": "https://distintaslatitudes.net/wp-content/uploads/2017/03/shridhar-gupta-dZxQn4VEv2M-unsplash.jpg",
					"id": 1
				},
				{
					"main": false,
					"src": "https://revistaaxxis.com.co/wp-content/uploads/2019/12/coworking.jpg",
					"id": 1
				},
				{
					"main": false,
					"src": "https://coworker.imgix.net/photos/colombia/medellin/selina-medellin-cowork/2.jpg",
					"id": 1
				}
			],
			"price": "5500",
			"prices": {
				"priceHour": 7300,
				"priceDay": 76000,
				"priceWeek": 320000,
				"priceMoth": 1800000
			},
			"type": "Sala de reuniones",
			"quantity": 4,
			"cantidadPersonas": 5,
			"direction" : "Ac. 53 ## 23-32",
			"amenidades": [
				"Cafe",
				"impresora",
				"parqueadero",
				"Wifi",
				"Yoga",
				"maternidad",
				"Estacionamiento para carros"
			]
		}
	]

	return (
		<Card withBorder>
			<Carousel
				value={offices}
				numVisible={1}
				numScroll={1}
				itemTemplate={officeTemplate}
				circular
				autoplayInterval={3000}
			/>
		</Card>

	);
};
export default CardChange