This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

This is one of the projects I've built as part of the SWE fellowship program by Headstarter.

# Tech

- Firebase
- Next.js
- React
- GCP (Google Cloud Platform)
- Vercel
- CI/CD

## What I learned over the course of the project

### Refined search logic in search bar

```
const filteredItems = pantryItem.filter((item) =>
  item.name.toLowerCase().split(' ').some(word =>
    word.startsWith(searchQuery.toLowerCase())
  )
);
```

1. The process:

- Filtering process called on pantryItem array
- Go through each item in the array and apply filtering logic

2. Logic:

- Setting it to lowercase so that the search is case-insensitive

3. `.some()`

- some() tests whether at least one element in the array passes the test implemented by the provided function
- return true if it matches the condition, false otherwise

4. ` .startsWith(searchQuery.toLowerCase())`

- Checks if the word starts with the lowercase search query
- `.startsWith()` is a string method that determines where the string begins with the characters of a specified string
