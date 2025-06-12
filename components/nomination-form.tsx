"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

const formSchema = z.object({
  nomineeName: z.string().min(2, { message: "Nominee name must be at least 2 characters." }),
  nomineeEmail: z.string().email({ message: "Please enter a valid email address." }),
  nomineePhone: z.string().min(10, { message: "Please enter a valid phone number." }),
  category: z.string().min(1, { message: "Please select an award category." }),
  nominatorName: z.string().min(2, { message: "Your name must be at least 2 characters." }),
  nominatorEmail: z.string().email({ message: "Please enter a valid email address." }),
  relationship: z.string().min(1, { message: "Please specify your relationship to the nominee." }),
  achievements: z.string().min(50, { message: "Please provide at least 50 characters describing the achievements." }),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions.",
  }),
})

export default function NominationForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nomineeName: "",
      nomineeEmail: "",
      nomineePhone: "",
      category: "",
      nominatorName: "",
      nominatorEmail: "",
      relationship: "",
      achievements: "",
      termsAccepted: false,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <CheckCircle2 className="mb-4 h-16 w-16 text-green-500" />
        <h3 className="mb-2 text-2xl font-bold text-gray-900">Nomination Submitted!</h3>
        <p className="mb-6 text-gray-600">
          Thank you for your nomination. Our team will review it and contact you if we need any additional information.
        </p>
        <Button onClick={() => setIsSubmitted(false)} variant="outline" className="text-gray-700">
          Submit Another Nomination
        </Button>
      </div>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Nominee Information</h3>

          <FormField
            control={form.control}
            name="nomineeName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Nominee's Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter nominee's full name" {...field} className="text-gray-900" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="nomineeEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Nominee's Email</FormLabel>
                  <FormControl>
                    <Input placeholder="nominee@email.com" {...field} className="text-gray-900" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nomineePhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Nominee's Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="+91 9876543210" {...field} className="text-gray-900" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Award Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="text-gray-700">
                      <SelectValue placeholder="Select award category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="trainer">Fitness Trainer of the Year</SelectItem>
                    <SelectItem value="transformation">Fitness Transformation</SelectItem>
                    <SelectItem value="wellness">Wellness Advocate</SelectItem>
                    <SelectItem value="entrepreneur">Fitness Entrepreneur</SelectItem>
                    <SelectItem value="community">Community Impact Award</SelectItem>
                    <SelectItem value="content">Fitness Content Creator</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4 pt-4">
          <h3 className="text-lg font-semibold text-gray-900">Your Information</h3>

          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="nominatorName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Your Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" {...field} className="text-gray-900" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nominatorEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Your Email</FormLabel>
                  <FormControl>
                    <Input placeholder="your@email.com" {...field} className="text-gray-900" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="relationship"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Relationship to Nominee</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="text-gray-700">
                      <SelectValue placeholder="Select your relationship" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="self">Self (I am nominating myself)</SelectItem>
                    <SelectItem value="colleague">Colleague</SelectItem>
                    <SelectItem value="client">Client</SelectItem>
                    <SelectItem value="friend">Friend</SelectItem>
                    <SelectItem value="family">Family Member</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4 pt-4">
          <h3 className="text-lg font-semibold text-gray-900">Nomination Details</h3>

          <FormField
            control={form.control}
            name="achievements"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Achievements & Contributions</FormLabel>
                <FormDescription className="text-gray-500">
                  Describe why the nominee deserves this award. Include specific achievements, impact, and examples.
                </FormDescription>
                <FormControl>
                  <Textarea
                    placeholder="Please provide details about the nominee's achievements..."
                    className="min-h-[150px] text-gray-900"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="termsAccepted"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="font-normal text-gray-700">
                  I confirm that all information provided is accurate
                </FormLabel>
                <FormDescription className="text-gray-500">
                  By submitting this nomination, you agree to our privacy policy and nomination guidelines.
                </FormDescription>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white">
          Submit Nomination
        </Button>
      </form>
    </Form>
  )
}
