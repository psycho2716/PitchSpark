export const posts = [
    {
        _id: 1,
        title: "We Robots",
        category: "Robots",
        image: "https://images.unsplash.com/photo-1638437447465-033e33537dab?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "This is a description.",
        views: 55,
        author: {
            _id: 1,
            name: "John Doe",
            image: "",
            bio: "This is a bio.",
            _createdAt: "Yesterday",
            _updatedAt: "Today"
        },
        _createdAt: new Date().toDateString(),
        _updatedAt: "Today"
    }
];
