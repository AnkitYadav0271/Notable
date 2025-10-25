

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { getData } from '@/context/UserContext'
import { Label } from '@radix-ui/react-dropdown-menu';
import { Loader2 } from 'lucide-react';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function AddNote() {
    const {user} = getData();
    const [isLoading,setLoading] = useState(false);
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
              AddNote{" "}
            </CardTitle>
            <CardDescription className={"text-center"}>
              
            Share save and organize your thoughts with Notable.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form>
              <div className="flex flex-col gap-6">
                {/* Heading Field */}
                <div className="grid gap-2">
                  <Label htmlFor="email">Note Title</Label>
                  <Input
                    id="noteHeading"
                    type="text"
                    name="noteHeading"
                    placeholder="m@example.com"
                    required
                  />
                </div>

                {/* Password Field */}
                <div className="grid gap-2">
                  <div>
                    <Label htmlFor="password">Description</Label>
                  </div>

                  <div className="relative ">
                    <Input
                      id="noteDescription"
                      name="noteDescription"
                      placeholder="Write description here"
                      required
                    />
                    
                  </div>
                </div>
              </div>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col gap-2">
            <Button
              type="submit"
              
              className="w-full bg-green-600 hover:bg-green-500 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin"> </Loader2>
                  Saving... your thought
                </>
              ) : (
                "Save"
              )}
            </Button>
          </CardFooter>
        </Card>

        </div>
      
    </div>
  )
}

export default AddNote;
