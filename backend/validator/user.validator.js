import yup from "yup";
export const userSchema = yup.object({
  username: yup
    .string()
    .trim(" ")
    .min(3, "username must be at least 3 chars ")
    .required("username is required"),
  email: yup
    .string()
    .email("the email is not valid")
    .required("email is required "),
  password: yup.string().min(8, "password must be at least 8 chars").required(),
});

export const validateUser = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body);
    next();
  } catch (err) {
    return res.status(400).json({ error: err.errors });
  }
};
