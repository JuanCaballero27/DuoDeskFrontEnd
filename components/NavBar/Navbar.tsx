import React, { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Button, Menu, Group, Image, Input, Autocomplete, TextInput, Select, Drawer, Modal } from '@mantine/core'
import { useForm, useWindowScroll } from '@mantine/hooks'
import { DatePicker } from '@mantine/dates';
import { GiModernCity } from 'react-icons/gi'
import { BsCalendarWeek } from 'react-icons/bs';
import { MdOutlinePeopleAlt } from 'react-icons/md';
import { VscTypeHierarchy } from 'react-icons/vsc'

import AuthModal from '../Authenticacion/AuthModal';

import { loginUser, logoutUser } from '../../Redux/actions/authActions';
import { getSearch, updateSearch } from '../../Redux/actions/searchActions';


import Logo from '../../Img/logos/LogoDuoDesk.svg'
import Footer from './Footer';

interface NavbarProps {
	stick?: string
}
const NavBar: FC<NavbarProps> = (props) => {
	const [mobile, setMobile] = useState<boolean>(false)
	const [opened, setOpened] = useState<boolean>(false)
	const router = useRouter()
	const dispatch = useDispatch()
	const spaces = ["Oficina privada", "Escritorio personal", "Sala de conferencias", "Espacio abierto"]
	const user = useSelector((state: any) => {
		return state.authentication
			? state.authentication
			: { logged: false }
	})
	const search = useSelector((state: any) => {
		return state.search
	})

	const searchForm = useForm({
		initialValues: {
			city: '',
			date: new Date(Date.now()),
			people: 1,
			type: 'Oficina privada'
		}
	})

	useEffect(() => {
		dispatch(loginUser(true))
		dispatch(getSearch())
		if (window.innerWidth <= 800) {
			setMobile(true)
		}
		const handleResize = () => {
			if (window.innerWidth <= 800) {
				setMobile(true)
			}
			else {
				setMobile(false)
			}
		}
		window.addEventListener('resize', handleResize)
		console.log(search)
		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	useEffect(() => {
		if (search.city) searchForm.setFieldValue('city', search.city)
		if (search.date) searchForm.setFieldValue('date', new Date(search.date))
		if (search.city) searchForm.setFieldValue('city', search.city)
		if (search.city) searchForm.setFieldValue('city', search.city)
	}, [search])


	const handleSubmit = (values: any) => {
		let url = `/search?`
		dispatch(updateSearch({
			city: searchForm.values.city,
			date: searchForm.values.date,
			people: searchForm.values.people,
			type: searchForm.values.type
		}))
		if (values.city) {
			url = `${url}city=${values.city}&`
		}
		if (values.date) {
			url = `${url}date=${values.date}&`
		}
		if (values.people) {
			url = `${url}people=${values.people}&`
		}
		if (values.type) {
			url = `${url}type=${values.type}`
		}
		window.location.href = url
	}


	const logOutHandler = () => {
		dispatch(logoutUser())
	}

	if (mobile) {
		return (
			<div>
				<div className={`flex flex-row justify-between place-items-stretch items-center w-full sticky top-0 p-3 z-10 bg-white shadow-md`}>
					<div className="">
						<Image
							src={Logo.src}
							width={75}
							onClick={() => router.push('/', '/')}
						/>
					</div>
					<div>
						<Drawer opened={opened} size="xl" onClose={() => setOpened(false)} title="Buscar una oficina" padding="md">
							<form onSubmit={searchForm.onSubmit(handleSubmit)} className="flex flex-col justify-center space-y-6 p-4">
								<div>
									<Autocomplete
										icon={<GiModernCity />}
										data-autofocus
										label="Escoger ciudad"
										id="city-search"
										placeholder="Escoger ciudad"
										data={['Hello']}
										size="xs"
										value={searchForm.values.city}
										onChange={event => searchForm.setFieldValue('city', event.valueOf())} />
								</div>
								<div>
									<DatePicker
										icon={<BsCalendarWeek />}
										label="Escoger fecha de inicio"
										size="xs"
										placeholder="Fecha de inicio"
										dropdownType="modal"
										value={searchForm.values.date}
										onChange={event => {
											if (event?.valueOf()) {
												searchForm.setFieldValue('date', new Date(event.valueOf()))
											}
										}} />
								</div>
								<div>
									<TextInput
										icon={<MdOutlinePeopleAlt />}
										label="Número de personas"
										size="xs"
										type="number"
										min={1}
										value={searchForm.values.people}
										onChange={event => searchForm.setFieldValue('people', Number(event.target.value))}
										placeholder="Número de personas" />
								</div>
								<div>
									<Select
										icon={<VscTypeHierarchy />}
										label="Tipo de espacio"
										data={spaces}
										defaultChecked
										defaultValue="Oficina privada"
										size="xs"
										value={searchForm.values.type}
										onChange={event => searchForm.setFieldValue('type', event.valueOf())} />
								</div>
								<div className="mx-auto">
									<Button size="xs" variant="light" type="submit">Buscar</Button>
								</div>
							</form>
						</Drawer>
						<Button color="indigo" variant="link" onClick={() => setOpened(!opened)}>
							Buscar
						</Button>

					</div>
					{user.logged
						? <div>
							<Menu
								placement="center"
								control={<Avatar src={user.user.image} radius="xl" size="md" />}
							>
								<Menu.Label>Cuenta</Menu.Label>
								<Menu.Item onClick={() => router.push('/dashboard/account', '/dashboard/account')}>Mi cuenta</Menu.Item>
								<Menu.Item onClick={() => router.push('/register-office', '/register-office')}>Registrar una oficina</Menu.Item>
								<Menu.Label>Sesión</Menu.Label>
								<Menu.Item color="pink" onClick={logOutHandler}>Cerrar sesión</Menu.Item>
							</Menu>
						</div>
						:
						<div className="flex flex-row justify-end w-max">
							<AuthModal color="teal" variant="link" text="Inicia sesión" form="login" />
						</div>
					}
				</div>
				<div>
					{props.children}
				</div>
				<Footer/>
			</div>
		)
	}

	return (
		<div>
			<div className={`flex flex-row justify-around items-center sticky top-0 z-10 bg-white p-3 w-full shadow-md`}>
				<div>
					<Image
						src={Logo.src}
						fit='cover'
						width={150}
						onClick={() => router.push('/', '/')}
					/>
				</div>
				<form onSubmit={searchForm.onSubmit(handleSubmit)} className="flex flex-row justify-between border px-3 py-2 rounded-3xl">
					<div>
						<Autocomplete
							icon={<GiModernCity />}
							id="city-search"
							data={['Hello']}
							size="xs"
							variant="unstyled"
							placeholder="Escoger ciudad"
							value={searchForm.values.city}
							onChange={event => searchForm.setFieldValue('city', event.valueOf())} />
					</div>
					<div>
						<DatePicker
							icon={<BsCalendarWeek />}
							id="date-search"
							size="xs"
							placeholder="Fecha de inicio"
							variant="unstyled"
							excludeDate={(date) => {
								const now = new Date(Date.now())
								if (+date === +now) {
									alert(date)
								}
								return !(+date > +now)
							}}
							value={searchForm.values.date}
							onChange={event => {
								if (event?.valueOf()) {
									searchForm.setFieldValue('date', new Date(event.valueOf()))
								}
							}} />
					</div>
					<div>
						<TextInput
							icon={<MdOutlinePeopleAlt />}
							id="people-search"
							size="xs"
							type="number"
							variant="unstyled"
							min={1}
							value={searchForm.values.people}
							onChange={event => searchForm.setFieldValue('people', Number(event.target.value || 1))}
							className='px-0'
							placeholder="Número de personas" />
					</div>
					<div>
						<Select
							icon={<VscTypeHierarchy />}
							id="type-search"
							data={spaces}
							variant="unstyled"
							defaultChecked
							defaultValue="Oficina privada"
							size="xs"
							value={searchForm.values.type}
							onChange={event => searchForm.setFieldValue('type', event.valueOf())} />
					</div>
					<div>
						<Button size="xs" variant="white" color="teal" type="submit">Buscar</Button>
					</div>
				</form>
				{user.logged
					? <div>
						<Menu
							withArrow
							placement="end"
							control={<Avatar src={user.user.image} radius="xl" size="md" />}
							zIndex={500}
						>
							<Menu.Label>Cuenta</Menu.Label>
							<Menu.Item onClick={() => router.push('/dashboard/account', '/dashboard/account')}>Mi cuenta</Menu.Item>
							<Menu.Item onClick={() => router.push('/register-office', '/register-office')}>Registrar una oficina</Menu.Item>
							<Menu.Label>Sesión</Menu.Label>
							<Menu.Item color="pink" onClick={logOutHandler}>Cerrar sesión</Menu.Item>
						</Menu>
					</div>
					:
					<div className="flex flex-row justify-end w-max space-x-6">
						<div>
							<AuthModal color="indigo" variant="link" text="Iniciar Sesión" form="login" />
						</div>
						<div>
							<AuthModal color="pink" variant="link" text="Registrarse" form="signup" />
						</div>
					</div>
				}
			</div>
			<div className='w-full'>
				{props.children}
			</div>
			<Footer/>
		</div>
	)
}

export default NavBar