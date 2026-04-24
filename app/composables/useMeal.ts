// API RESPONSE TYPE DEFINITIONS

// Basic Meal Information
export interface Meal {
    idMeal: string
    strMeal: string
    strMealThumb: string
}

// Response Structure for Meal List Endpoints
interface MealListResponse {
    meals: Meal[]
}

// ingredients Data Structure
export interface Ingredient {
    idIngredient: string
    strIngredient: string
    strThumb: string
    strDescription?: string
}

// Response Structure for Ingredient List
interface IngredientListResponse {
    meals: Ingredient[]
}


// Detailed Meal Information
export interface MealDetail {
  idMeal: string
  strMeal: string
  strMealThumb: string
  strCategory: string
  strArea: string
  strInstructions: string
  strYoutube: string
  [key: string]: string 
}

// Response Structure for Meal detail Endpoints
export interface MealDetailResponse {
  meals: MealDetail[]
}


// Meal Category Data Structure
export interface Category {
  idCategory: string
  strCategory: string
  strCategoryThumb: string
  strCategoryDescription: string
}

// Response Structure for Category list
interface CategoryListResponse {
  categories: Category[]
}


// API COMPOSABLE
export const useMeal = () => {
    const config = useRuntimeConfig()
    const base = config.public.apiBase

    // Fetch all available ingredients
    const getIngredients = async (): Promise<IngredientListResponse> => {
        return await $fetch(`${base}/list.php?i=list`)
    }

    // Get Meal filtered by ingredient
    const filterByIngredient = async (ingredientName: string): Promise<MealListResponse> => {
        return await $fetch(`${base}/filter.php?i=${ingredientName}`)
    }

    // Get detailed Information 
    const getMealDetails = async (mealId: string): Promise<MealDetailResponse> => {
        return await $fetch(`${base}/lookup.php?i=${mealId}`)
    }

    // FetCH All Categories
    const getCategories = async (): Promise<CategoryListResponse> => {
        return await $fetch(`${base}/categories.php`)
    }
    
    // Get meals by category
    const getMealsByCategory = async (category: string): Promise<MealListResponse> => {
        return await $fetch(`${base}/filter.php?c=${category}`)
    }


    return {
        getIngredients,
        filterByIngredient,
        getMealDetails,
        getCategories,
        getMealsByCategory
    }
    
}