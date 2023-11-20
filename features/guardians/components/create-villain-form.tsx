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

const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_MIME_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
];

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    age: z
        .coerce.number(),
    birth: z.string().optional(),
    image_url: z.any(),
    description: z.string().optional(),
})

const formData = new FormData();

export function CreateVillainForm() {
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/api/auth/signin?callbackUrl=/client')
        }
    })


    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            age: 0,
            birth: "",
            image_url: "",
            description: "",
        },
    })



    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.


        formData.append("name", values.name);
        formData.append("age", values.age.toString());
        formData.append("birth", values.birth!);

        if (values.description) {
            formData.append("description", values.description!);
        }

        // console.log(formData.values);
        try {
            const url = "http://127.0.0.1:8000/villains/villains/";
            const response = await axios.post(url, formData, {
                headers: {
                    // 'Content-Type': 'multipart/form-data', // Do not include the boundary
                    'Authorization': `Token ${session?.user.accessAPIToken}`,
                }
            });
            console.log("backapi: ", response.data);
        } catch (error) {
            // Handle any errors here.
            console.error(error);
        }


    }

    function handleFileChange(event: any) {
        const file = event.target.files[0]; // Get the selected file

        console.log(file);
        // Now, update the 'image_url' field in your form data with the selected file
        formData.append("image_url", file);
    }


    return (
        <div className="flex items-center justify-center">
            <div className="w-96 h-96">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                                    <FormLabel>Image</FormLabel>
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
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </div>
        </div>

    )
}
