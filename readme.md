#CRUD RESTFUL API

##USER LOGIN AND REGISTRATION

```
1. Create user / Register - /api/v1/auth/register
2. Login- /api/v1/auth/login
3. Sign out - /api/v1/auth/logout
```
##DEALING WITH POSTS(with authentication)

```
1. Create post(POST) - /api/v1/posts/
2. Edit post (PUT)- /api/v1/posts/:id
3. Delet Post (DELETE) - /api/v1/posts/:id
4. Get Post (GET) - /api/v1/posts/:id
5. Search by description(GET) -/api/v1/posts/search/:desc
6. Get Photo (GET) - /api/v1/posts/:id/photo
7. Delete photo from post (DELETE) -/api/v1/posts/:id/:fileName
8. Update photo of post (PUT) - /api/v1/posts/:id/:fileName

```
##Without authentication

```
1.Get All posts(GET) - /api/v1/posts/
2.Get Recent posts(GET) - /api/v1/posts/recent/:num
```

##Dealing with current user

```
1.Get my posts (GET) - /api/v1/users/posts
2.Update User (PUT) - /api/v1/users/update
3.Update Password (PUT) -/api/v1/users/updatePassowrd
4.Search users by name (PUT) - /api/v1/users/:name
```
