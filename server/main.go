package main

import (
	"fmt"
	"net/http"
	"time"

	"github.com/gorilla/mux"
)

func main() {
	router := mux.NewRouter() // Create a new router

	// Allow CORS from any origin
	router.HandleFunc("/events", func(w http.ResponseWriter, r *http.Request) {
		// Set CORS headers
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Origin, Content-Type, Accept")
		w.Header().Set("Access-Control-Expose-Headers", "Cache-Control, Content-Language, Content-Type, Expires, Last-Modified, Pragma")
		w.Header().Set("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
		w.Header().Set("Cache-Control", "post-check=0, pre-check=0")
		w.Header().Set("Pragma", "no-cache")

		// Set SSE headers
		w.Header().Set("Content-Type", "text/event-stream")
		w.Header().Set("Cache-Control", "no-cache")
		w.Header().Set("Connection", "keep-alive")

		// Simulate sending events every 2 seconds
		ticker := time.NewTicker(2 * time.Second)
		defer ticker.Stop()

		// Send SSE events
		for {
			select {
			case <-r.Context().Done():
				fmt.Println("Client disconnected")
				return
			case <-ticker.C:
				// Construct and send an SSE event
				event := "message"
				fmt.Fprintf(w, "event: %s\ndata: %s\n\n", event, `{"message": "This is a simulated event from Go server."}`)
				w.(http.Flusher).Flush()
			}
		}
	})

	// Serve the SSE endpoint on the router
	http.Handle("/", router)

	// Start the HTTP server
	fmt.Println("Server started at :8080")
	http.ListenAndServe(":8080", nil)
}
