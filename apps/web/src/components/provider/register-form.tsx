"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Building2, Check, ChevronsUpDown } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { FileUpload } from "../ui/file-upload";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useApecProgram } from "@/hooks/use-apec-program";
import { COUNTRIES } from "@/lib/constants";
import { cn, generateIdFromTimestamp } from "@/lib/utils";
import { useRouter } from "next/navigation";

// Define the form schema with validation
const providerFormSchema = z.object({
  fullName: z
    .string()
    .min(2, {
      message: "Full name must be at least 2 characters.",
    })
    .max(100, {
      message: "Full name must not exceed 100 characters.",
    }),
  shortName: z
    .string()
    .min(2, {
      message: "Short name must be at least 2 characters.",
    })
    .max(10, {
      message: "Short name must not exceed 10 characters.",
    }),
  address: z
    .string()
    .min(5, {
      message: "Address must be at least 5 characters.",
    })
    .max(200, {
      message: "Address must not exceed 200 characters.",
    }),
  country: z.string().min(1, {
    message: "Please select a country.",
  }),
  description: z
    .string()
    .min(10, {
      message: "Description must be at least 10 characters.",
    })
    .max(500, {
      message: "Description must not exceed 500 characters.",
    }),
  logo: z
    .instanceof(File, {
      message: "Please select a valid image file.",
    })
    .optional()
    .refine(
      (file) => {
        if (!file) return true;
        return file.size <= 5 * 1024 * 1024; // 5MB limit
      },
      {
        message: "File size must be less than 5MB.",
      }
    )
    .refine(
      (file) => {
        if (!file) return true;
        return ["image/jpeg", "image/png", "image/webp"].includes(file.type);
      },
      {
        message: "Only JPEG, PNG and WebP images are allowed.",
      }
    ),
});

type ProviderFormValues = z.infer<typeof providerFormSchema>;

const ProviderRegisterForm = () => {
  const { initProvider } = useApecProgram();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // Generate unique ID based on current timestamp
  const providerId = generateIdFromTimestamp();

  const form = useForm<ProviderFormValues>({
    resolver: zodResolver(providerFormSchema),
    defaultValues: {
      fullName: "",
      shortName: "",
      address: "",
      country: "",
      description: "",
      logo: undefined,
    },
  });

  async function onSubmit(values: ProviderFormValues) {
    try {
      // Call initProvider with the form data - toast notifications handled in hook
      const result = await initProvider.mutateAsync({
        id: providerId,
        ...values,
      });

      if (result?.success) {
        // Reset form on successful submission
        router.refresh();
        console.log("Provider registered successfully!", result.signature);
      }
    } catch (error) {
      console.error("Error registering provider:", error);
      // Error toast is handled in the hook
    }
  }

  return (
    <Card className="shadow-xl border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg">
      <CardHeader className="text-center pb-6">
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-primary/10 rounded-full">
            <Building2 className="w-8 h-8 text-primary" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
          Register as Provider
        </CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-300">
          Create your provider profile to start issuing certificates
        </CardDescription>
      </CardHeader>
      <CardContent className="p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold text-gray-900 dark:text-white">
                    Full Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="APEC Institute for Education"
                      className="h-12 text-base border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary/20"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-gray-500 dark:text-gray-400">
                    The complete official name of your organization.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="shortName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold text-gray-900 dark:text-white">
                    Short Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="APEC"
                      className="h-12 text-base border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary/20"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-gray-500 dark:text-gray-400">
                    A short abbreviation (max 10 characters) for your
                    organization.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold text-gray-900 dark:text-white">
                    Address
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="123 Education Street, Learning District, City..."
                      rows={3}
                      className="text-base border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary/20"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-gray-500 dark:text-gray-400">
                    The physical address of your organization.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold text-gray-900 dark:text-white">
                    Country
                  </FormLabel>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className="h-12 w-full justify-between text-base border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary/20"
                        >
                          {field.value
                            ? COUNTRIES.find(
                                (country) => country === field.value
                              )
                            : "Select a country"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search country..."
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>No country found.</CommandEmpty>
                          <CommandGroup>
                            {COUNTRIES.map((country) => (
                              <CommandItem
                                key={country}
                                value={country}
                                onSelect={(currentValue) => {
                                  field.onChange(
                                    currentValue === field.value
                                      ? ""
                                      : currentValue
                                  );
                                  setOpen(false);
                                }}
                              >
                                {country}
                                <Check
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    field.value === country
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormDescription className="text-gray-500 dark:text-gray-400">
                    The country where your organization is located.
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
                  <FormLabel className="text-base font-semibold text-gray-900 dark:text-white">
                    Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your organization and the certificates you'll issue..."
                      rows={5}
                      className="text-base border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary/20"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-gray-500 dark:text-gray-400">
                    Brief description of your organization and its mission.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="logo"
              render={({ field: { onChange, value, ...field } }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold text-gray-900 dark:text-white">
                    Provider Logo
                  </FormLabel>
                  <FormControl>
                    <FileUpload
                      value={value}
                      onFileChange={onChange}
                      accept="image/*"
                      maxSize={5 * 1024 * 1024} // 5MB
                      placeholder="Upload organization logo"
                      description="PNG, JPG, WebP up to 5MB"
                      bucket={process.env.NEXT_PUBLIC_STORAGE_PROVIDER_BUCKET}
                      filePath={`image_${providerId}`}
                      autoUpload
                    />
                  </FormControl>
                  <FormDescription className="text-gray-500 dark:text-gray-400">
                    Upload your organization logo. Max size: 5MB. Formats: JPEG,
                    PNG, WebP.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="pt-4">
              <Button
                type="submit"
                disabled={initProvider.isPending || !form.formState.isValid}
                className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                size="lg"
              >
                {initProvider.isPending
                  ? "Registering..."
                  : "Register Provider"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ProviderRegisterForm;
