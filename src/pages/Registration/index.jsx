import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Login.module.scss";
import { selectIsAuth, fetchAuth, fetchRegister } from "../../redux/slices/auth";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";

export const Registration = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: " Daria A",
      email: "daria@test.com",
      password: "12345",
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));

    //keeping token
    if (!data.payload) {
      return alert("Registration failed");
    }

    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    } else {
      alert("Authorization failed!");
    }
  };

	if(isAuth) {
		return <Navigate to="/" />
	}

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Create account
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
				<form onSubmit={handleSubmit(onSubmit)}>
				<TextField
        error={Boolean(errors.password?.message)}
        helperText={errors.password?.message}
        {...register("fullName", { required: "Please write your full name" })}
        className={styles.field}
        label="Full name"
        fullWidth
      />
      <TextField
        error={Boolean(errors.password?.message)}
        helperText={errors.password?.message}
        {...register("email", { required: "Please write your email" })}
        className={styles.field}
        label="E-Mail"
        fullWidth
      />
      <TextField
        error={Boolean(errors.password?.message)}
        helperText={errors.password?.message}
        {...register("password", { required: "Please write your password" })}
        className={styles.field}
        label="Password"
        fullWidth
      />
      <Button disabled={ !isValid } type="submit" size="large" variant="contained" fullWidth>
        Register
      </Button>
				</form>
    </Paper>
  );
};
