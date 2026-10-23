import data from "@/config/restaurant.json";
import type { RestaurantConfig } from "@/types/restaurant";

// Unico punto di accesso ai dati del ristorante.
export const restaurant = data as unknown as RestaurantConfig;
