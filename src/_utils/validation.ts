import { parsePhoneNumberFromString } from "libphonenumber-js";
import { z, ZodIssueCode } from "zod";

// ✅ Zod schema

const passwordRegex = /^(?=.*\d)[A-Za-z\d]{8,}$/;

export const validatePhoneNumber = (
  numberField: string,
  countryField: string
) => {
  return (data: Record<string, unknown>, ctx: z.RefinementCtx) => {
    const phoneRaw = data[numberField];
    const countryCodeRaw = data[countryField];

    // ✅ تحقق أن كلا الحقلين string
    if (typeof phoneRaw !== "string" || typeof countryCodeRaw !== "string") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Phone number and country code are required",
      });
      return;
    }

    const phone = phoneRaw.trim();
    const countryCode = countryCodeRaw.trim();

    // ❌ لا يبدأ بـ 0
    if (phone.startsWith("0")) {
      ctx.addIssue({
        code: ZodIssueCode.custom,
        message: "Phone number must not start with 0",
        path: [numberField],
      });
      return;
    }

    try {
      const fullNumber = `${countryCode}${phone}`;
      const parsed = parsePhoneNumberFromString(fullNumber);

      if (!parsed?.isValid()) {
        ctx.addIssue({
          code: ZodIssueCode.custom,
          message: "Invalid phone number",
          path: [numberField],
        });
      }
    } catch {
      ctx.addIssue({
        code: ZodIssueCode.custom,
        message: "Invalid phone number",
        path: [numberField],
      });
    }
  };
};

export const closingFormSchema = z
  .object({
    developer: z
      .union([z.string(), z.number()])
      .refine((val) => val !== "" && val !== null && val !== undefined, {
        message: "Developer is required",
      }),

    project: z
      .union([z.string(), z.number()])
      .refine((val) => val !== "" && val !== null && val !== undefined, {
        message: "Project is required",
      }),
    vendor: z
      .union([z.string(), z.number()])
      .refine((val) => val !== "" && val !== null && val !== undefined, {
        message: "Partner is required",
      }),
    clientName: z.string().min(1, "Client name is required"),
    unitCode: z.string().min(1, "Unit code is required"),
    developerSalesName: z.string().min(1, "Developer sales name is required"),
    developerSalesNumber: z
      .string()
      .min(1, "Developer sales number is required"),
    dealValue: z.string().min(1, "Deal value is required"),
    uploadFile: z.custom<File>((val) => val instanceof File && val.size > 0, {
      message: "File is required",
    }),
    countryCode: z.string().min(1, "Country code is required"),
  })
  .superRefine((data, ctx) => {
    validatePhoneNumber("developerSalesNumber", "countryCode")(data, ctx);
  });

export const sharesProperties = z
  .object({
    sharedProperty: z
      .union([z.string(), z.number()])
      .refine((val) => val !== "" && val !== null && val !== undefined, {
        message: "Developer is required",
      }),

    sharesCount: z
      .union([z.string(), z.number()])
      .refine((val) => val !== "" && val !== null && val !== undefined, {
        message: "Project is required",
      }),
    clientName: z.string().min(1, "Client name is required"),
    // sharesValue: z.number().min(1, "Unit code is required"),
    developerSalesName: z.string().min(1, "Developer sales name is required"),
    developerSalesNumber: z
      .string()
      .min(1, "Developer sales number is required"),
    value: z.number().min(1, "Deal value is required"),
    uploadFile: z.custom<File>((val) => val instanceof File && val.size > 0, {
      message: "File is required",
    }),
    countryCode: z.string().min(1, "Country code is required"),
  })
  .superRefine((data, ctx) => {
    validatePhoneNumber("developerSalesNumber", "countryCode")(data, ctx);
  });

export const signupSchema = z
  .object({
    fullname: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(passwordRegex, "Password must include lowercase and number"),
    confirmPassword: z.string(),
    yearsExperience: z.string().min(1, "Years of experience is required"),
    city: z.string().min(1, "State is required"),
    phone: z.string().min(1, "Phone number is required"),
    countryCode: z.string().min(1, "Country code is required"),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: ZodIssueCode.custom,
        message: "Passwords don't match",
        path: ["confirmPassword"],
      });
    }

    validatePhoneNumber("phone", "countryCode")(data, ctx);
  });

export const loginSchema = z
  .object({
    phone: z.string().min(1, "Phone number is required"),
    password: z.string().min(1, "Password is required"),
    countryCode: z.string().min(1, "Country code is required"), // Needed for phone validation
  })
  .superRefine((data, ctx) => {
    validatePhoneNumber("phone", "countryCode")(data, ctx);
  });

export const updateAccountSchema = z
  .object({
    fullname: z.string().optional(),
    email: z.string().optional(),
    city: z.string().min(1, "State is required"),
    yearsExperience: z.string().optional(),
    phone: z.string().min(6, "Phone is required"),
    countryCode: z.string().min(1, "Country code is required"),
  })
  .superRefine((data, ctx) => {
    validatePhoneNumber("phone", "countryCode")(data, ctx);
  });
