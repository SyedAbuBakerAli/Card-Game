package main

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/go-redis/redis/v8"
)

func main() {
	// Connect to Redis server running in Docker
	client := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379", // Redis default address inside Docker
		Password: "",               // No password set
		DB:       0,                // Use default DB
	})

	// UserScore represents the structure for storing user scores
	type UserScore struct {
		Username string `json:"username"`
		Score    int    `json:"score"`
	}

	// Ping the Redis server to check the connection
	pong, err := client.Ping(context.Background()).Result()
	if err != nil {
		fmt.Println("Error connecting to Redis:", err)
		return
	}
	fmt.Println("Connected to Redis:", pong)

	// Define an HTTP handler to serve leaderboard data
	http.HandleFunc("/leaderboard", func(w http.ResponseWriter, r *http.Request) {
		// Set CORS headers to allow requests from any origin
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		// Check if the request method is OPTIONS (preflight request)
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}

		// Retrieve all data from the hash "game"
		leaderboard, err := client.HGetAll(context.Background(), "game").Result()
		if err != nil {
			http.Error(w, "Error retrieving data from Redis", http.StatusInternalServerError)
			return
		}

		// Convert the leaderboard data to JSON
		leaderboardJSON, err := json.Marshal(leaderboard)
		if err != nil {
			http.Error(w, "Error encoding leaderboard data to JSON", http.StatusInternalServerError)
			return
		}

		// Set Content-Type header to application/json
		w.Header().Set("Content-Type", "application/json")
		// Write the leaderboard JSON data to the response
		w.Write(leaderboardJSON)
	})

	http.HandleFunc("/score", func(w http.ResponseWriter, r *http.Request) {
		// Set CORS headers to allow requests from any origin
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		// Parse the request body to get the user's score
		var userScore UserScore
		if err := json.NewDecoder(r.Body).Decode(&userScore); err != nil {
			http.Error(w, "Error decoding request body", http.StatusBadRequest)
			return
		}

		// Store the user's score in the Redis database
		if err := client.HSet(context.Background(), "game", userScore.Username, userScore.Score).Err(); err != nil {
			http.Error(w, "Error storing score in Redis", http.StatusInternalServerError)
			return
		}

		// Respond with a success message
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("Score stored successfully"))
	})

	// Start the HTTP server on port 8080
	fmt.Println("Starting server on port 8080")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		fmt.Println("Error starting server:", err)
	}
}
