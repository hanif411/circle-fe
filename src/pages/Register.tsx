import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const { register, loading, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [full_name, setFull_Name] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    register({ email, password, full_name });
    navigate("/");
  };
  return (
    <div className="max-w-md mx-auto mt-30">
      <Card>
        <CardHeader>
          <CardTitle>Circle</CardTitle>
          <CardDescription>Create Account Circle</CardDescription>
          {error && <p className="text-red-500">{error}</p>}
          {loading && <p className="text-red-500">{loading}</p>}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Full name</FieldLabel>
                <Input
                  id="full_name"
                  type="text"
                  placeholder="full name"
                  required
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFull_Name(e.target.value)
                  }
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="email"
                  required
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                />
              </Field>
              <Field>
                <Button type="submit">Register</Button>
                <FieldDescription className="text-center">
                  Already have Account? <Link to={"/login"}>Login</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Register;
