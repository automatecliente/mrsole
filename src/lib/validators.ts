import { z } from 'zod/v4';

export const checkoutFormSchema = z.object({
  name: z
    .string()
    .min(3, 'Nome deve ter pelo menos 3 caracteres')
    .max(100, 'Nome muito longo'),
  phone: z
    .string()
    .min(10, 'WhatsApp inválido')
    .max(15, 'WhatsApp inválido')
    .regex(/^\d{10,15}$/, 'Use apenas números, com DDD. Ex: 81999999999'),
  city: z
    .string()
    .min(2, 'Cidade é obrigatória'),
  state: z
    .string()
    .min(2, 'Selecione o estado')
    .max(2, 'Use a sigla do estado (ex: SP)'),
  neighborhood: z
    .string()
    .optional(),
  deliveryPreference: z.enum(['home', 'pickup', 'discuss']),
  notes: z
    .string()
    .max(500, 'Observação muito longa')
    .optional(),
});

export type CheckoutFormData = z.infer<typeof checkoutFormSchema>;

export const addToCartSchema = z.object({
  productId: z.string(),
  size: z.string().min(1, 'Selecione o tamanho'),
  color: z.string().min(1, 'Selecione a cor'),
  quantity: z.number().min(1).max(10),
});
