"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import axiosInstance from "axios";
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { redirect } from "next/navigation"
import { useSession } from "next-auth/react"
import axios from "axios"
import { CharacterEnemies, Power, Villain } from "../types/Villain";
import { HeroName } from "@/app/(general)/scheduler/page";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import SelectHeroFriends from "./SelectHeroFriends";
import SelectPowers from "./SelectPowers";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useRouter } from 'next/navigation'


const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const formSchema = z.object({
  id: z.coerce.number(),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  age: z
    .coerce.number(),
  birth: z.string().optional(),
  image_url: z.any(),
  image_screen_large_url: z.any(),
  description: z.string().optional(),
  character_enemies: z.record(z.string(), z.string()),
  powers: z.record(z.string(), z.string()),
  weaknesses: z.record(z.string(), z.string()),
})

const formData = new FormData();

export function CreateVillainForm({ heroNames }: { heroNames: HeroName[] }) {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/api/auth/signin?callbackUrl=/client')
    }
  })

  const router = useRouter()
  const [selectedEnemies, setSelectedEnemies] = useState<{ id: number, name: string }[]>([]);
  const [selectedPowers, setSelectedPowers] = useState<{ id: number, name: string }[]>([]);
  const [errorPostForm, setErrorPostForm] = useState(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: 0,
      name: "",
      age: 0,
      birth: "",
      image_url: "",
      image_screen_large_url: "",
      description: "",
      character_enemies: {},
      powers: {},
      weaknesses: {},
    },
  })



  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.


    formData.append("id", values.id.toString());
    formData.append("name", values.name);
    formData.append("age", values.age.toString());
    formData.append("birth", values.birth!);

    if (values.description) {
      formData.append("description", values.description!);
    }

    const enemies: CharacterEnemies = selectedEnemies.reduce((acc: CharacterEnemies, { id, name }) => {
      acc[id] = name;
      return acc;
    }, {});
    formData.append("character_enemies", JSON.stringify(enemies));

    const powers: Power = selectedPowers.reduce((acc: Power, { id, name }) => {
      acc[id] = name;
      return acc;
    }, {});
    formData.append("powers", JSON.stringify(powers));
    if (values.description) {
      formData.append("description", values.description!);
    }


    const val: any = {};
    formData.forEach((value, key) => {
      val[key] = value;
    });

    console.log("values: ", values);




    try {
      const url = "http://127.0.0.1:8000/villains/villains/";
      const response = await axios.post(url, formData, {
        headers: {
          // 'Content-Type': 'multipart/form-data', // Do not include the boundary
          'Authorization': `Token ${session?.user.accessAPIToken}`,
        }
      });
      console.log("backapi: ", response.data);
      router.push("/villains");

    } catch (error) {
      // Handle any errors here.
setErrorPostForm(true);

      console.error(error);
    }


  }

  function handleFileChange(event: any) {
    const file = event.target.files[0]; // Get the selected file

    console.log(file);
    // Now, update the 'image_url' field in your form data with the selected file
    formData.append("image_url", file);
  }

  function handleFileChangeScreenUrl(event: any) {
    const file = event.target.files[0]; // Get the selected file

    console.log(file);
    // Now, update the 'image_url' field in your form data with the selected file
    formData.append("image_screen_large_url", file);
  }

  function selectEnemie(id: number, name: string) {
    // console.log("id: ", id, " name: ", name)
    // setSelectedenemies([...selectedenemies, { id, name }])
    // console.log("selectedenemies: ", selectedenemies)

    setSelectedEnemies((prevEnemies) => {
      // Check if the enemie is already in the array
      if (!prevEnemies.some((existingEnemie) => existingEnemie.id === id)) {
        // If not, add the enemie to the array
        return [...prevEnemies, { id, name }];
      }
      // If the enemie is already in the array, return the previous state
      return prevEnemies;
    });

  }

  function selectPower(id: number, name: string) {
    // console.log("id: ", id, " name: ", name)
    // setSelectedPowers([...selectedPowers, { id, name }])
    // console.log("powers: ", selectedPowers)

    setSelectedPowers((prevPowers) => {
      // Check if the power is already in the array
      if (!prevPowers.some((existingPower) => existingPower.id === id)) {
        // If not, add the power to the array
        return [...prevPowers, { id, name }];
      }
      // If the power is already in the array, return the previous state
      return prevPowers;
    });
  }

  return (
    <div className="flex items-center justify-center">
      <div className="w-96 h-96">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">


            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Identification Number</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Enter an Id" {...field} />
                  </FormControl>
                  <FormDescription>
                    Give an id to your villain.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />


            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter a name" {...field} />
                  </FormControl>
                  <FormDescription>
                    This will be the name of your hero.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Enter an Age" {...field} />
                  </FormControl>
                  <FormDescription>
                    How old you want your hero to be?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="birth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Birth</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter the Origin" {...field} />
                  </FormControl>
                  <FormDescription>
                    Where was your villain born?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image<br /></FormLabel>
                  <FormControl>
                    {/* <Input {...field} type="file" accept="image/jpeg,image/png,image/gif" placeholder="Choose an image" /> */}
                    <input
                      type="file"
                      accept="image/jpeg, image/png, image/gif"
                      onChange={(event) => handleFileChange(event)}
                    />
                  </FormControl>
                  <FormDescription>
                    Upload the best angle.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image_screen_large_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Background Image</FormLabel>
                  <FormControl>
                    {/* <Input {...field} type="file" accept="image/jpeg,image/png,image/gif" placeholder="Choose an image" /> */}
                    <input
                      type="file"
                      accept="image/jpeg, image/png, image/gif"
                      onChange={(event) => handleFileChangeScreenUrl(event)}
                    />
                  </FormControl>
                  <FormDescription>
                    Upload the baddest background.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Choose an image" {...field} />
                  </FormControl>
                  <FormDescription>
                    Tell us somehting about your hero
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem>
              <FormLabel>Enemies<br /></FormLabel>
              <SelectHeroFriends heroNames={heroNames} handleChange={selectEnemie} />
              <div className="w-full flex flex-wrap">
                {selectedEnemies.map((enemie) => (
                  <Badge key={enemie.id} variant="outline">{enemie.name}</Badge>))}
              </div>
              <FormDescription>
                Select the enemies of the villain
              </FormDescription>
            </FormItem>

            <FormItem>
              <FormLabel>Powers<br /></FormLabel>
              <SelectPowers handleChange={selectPower} />
              <div className="w-full flex flex-wrap">
                {selectedPowers.map((power) => (
                  <Badge key={power.id} variant="outline">{power.name}</Badge>))}
              </div>
              <FormDescription>
                Select some powers for your hero
              </FormDescription>
            </FormItem>


            <Button type="submit">Submit</Button>
          </form>
        </Form>

        {errorPostForm && <Alert variant="destructive">
          <AlertCircle className="h-4 w-4 mt-3" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            There was an error persisting the data in the server.
          </AlertDescription>
        </Alert>
        }
      </div>
    </div>

  )
}
