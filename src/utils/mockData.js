// Mock data for development/fallback purposes
export const mockProducts = [
    {
        id: 1,
        name: "Sample Product 1",
        description: "This is a sample product for testing purposes",
        price: 999,
        image: "https://via.placeholder.com/400x400?text=Product+1",
        rating: 4.5,
        offer: 20,
        isFreeDelevary: true,
        countInStack: 50,
        numOfReview: 25
    },
    {
        id: 2,
        name: "Sample Product 2",
        description: "Another sample product for testing",
        price: 1499,
        image: "https://via.placeholder.com/400x400?text=Product+2",
        rating: 4.2,
        offer: 15,
        isFreeDelevary: false,
        countInStack: 30,
        numOfReview: 18
    },
    {
        id: 3,
        name: "Sample Product 3",
        description: "Third sample product for demonstration",
        price: 799,
        image: "https://via.placeholder.com/400x400?text=Product+3",
        rating: 4.8,
        offer: 25,
        isFreeDelevary: true,
        countInStack: 75,
        numOfReview: 42
    }
];

export const mockUsers = [
    {
        id: 1,
        name: "John Doe",
        image: "https://via.placeholder.com/50x50?text=JD"
    },
    {
        id: 2,
        name: "Jane Smith",
        image: "https://via.placeholder.com/50x50?text=JS"
    }
];

export const mockReviews = [
    {
        id: 1,
        user: 1,
        product: 1,
        name: "John Doe",
        rating: 5,
        comment: "Excellent product! Highly recommended."
    },
    {
        id: 2,
        user: 2,
        product: 1,
        name: "Jane Smith",
        rating: 4,
        comment: "Good quality, fast delivery."
    }
];