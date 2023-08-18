import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useForm } from 'react-hook-form';
import styles from "./Login.module.scss";
import { useDispatch } from "react-redux";
import { fetchAuth } from "../../redux/slices/auth";
import { useNavigate } from "react-router-dom";

export const Login = () => {
	const dispatch = useDispatch();

	const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm({
		defaultValues: {
			email: 'test@test.ru',
			password: '123',
		},
		mode: 'onChange',
	});

	const onSubmit = (values) => {
		dispatch(fetchAuth(values));
	}
  return (
		<Paper classes={{ root: styles.root }}>
			<Typography classes={{ root: styles.title }} variant="h5">
				Log in to your account
			</Typography>
			<form onSubmit={handleSubmit(onSubmit)}>
				<TextField
					className={styles.field}
					label="E-Mail"
					error={Boolean(errors.email?.message)}
					helperText={errors.email?.message}
					{...register('email', { required: 'Please write your email' })}
					fullWidth
				/>
				<TextField
					className={styles.field}
					label="Password"
					error={Boolean(errors.password?.message)}
					helperText={errors.password?.message}
					{...register('password', { required: 'Please write your password' })}
					fullWidth
				/>
				<Button size="large" variant="contained" fullWidth type="submit">
					Log in
				</Button>
			</form>
		</Paper>
	);
	}	