

import { getData } from '@/context/UserContext'
import React from 'react'

function AddNote() {
    const {user} = getData();
  return (
    <div className='min-h-screen bg-green-100 p-4 flex items-center justify-center'>
        <div className="w-full max-w-md  space-y-6">
            <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-green-600">
              Hello {user?.username}
            </h1>
            <p className="text-gray-600">
              All of your thoughts and ideas here.
            </p>
          </div>

          <Card className="w-full">
          <CardHeader className={"space-y-1"}>
            <CardTitle className={"text-2xl text-center text-green-600"}>
              Login{" "}
            </CardTitle>
            <CardDescription className={"text-center"}>
              Login to get started with Notable.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form>
              <div className="flex flex-col gap-6">
                {/* Email Field */}
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="m@example.com"
                    value={state.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Password Field */}
                <div className="grid gap-2">
                  <div>
                    <Label htmlFor="password">Password</Label>
                  </div>

                  <div className="relative ">
                    <Input
                      id="password"
                      name="password"
                      placeholder="Enter your password"
                      type={showPassword ? "text" : "password"}
                      value={state.password}
                      onChange={handleChange}
                      required
                    />
                    <Button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      variant={"ghost"}
                      className={
                        "absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent "
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4 text-gray-600" />
                      ) : (
                        <Eye className="w-4 h-4 text-gray-600" />
                      )}
                    </Button>
                  </div>
                  <Link
                    to={"/forgot-password"}
                    className="text-blue-500 underline text-sm flex items-center justify-between"
                  >
                    Forgot your password?
                  </Link>
                  <div
                    className={`grid gap-2 ${err == "" ? "hidden" : "block"}`}
                  >
                    <p className="capitalize text-red-600 ">
                      {" "}
                      {err ? err : ""}{" "}
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col gap-2">
            <Button
              type="submit"
              onClick={handleSubmit}
              className="w-full bg-green-600 hover:bg-green-500 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin"> </Loader2>
                  Logging in to your account...
                </>
              ) : (
                "Login"
              )}
            </Button>
          </CardFooter>
        </Card>

        </div>
      
    </div>
  )
}

export default AddTask
