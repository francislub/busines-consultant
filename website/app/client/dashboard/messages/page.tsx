"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { Send, Search, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import ClientLayout from "@/components/client-layout"
import { useSession } from "next-auth/react"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock data for messages
const mockMessages = Array.from({ length: 10 }).map((_, i) => ({
  id: `message-${i + 1}`,
  content: `This is message ${i + 1}. ${i % 2 === 0 ? "Hello, I have a question about your services." : "Thank you for your inquiry. We'll get back to you soon."}`,
  isRead: i < 5,
  createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
  sender: {
    id: i % 2 === 0 ? "client-1" : "admin-1",
    name: i % 2 === 0 ? "You" : "Admin",
  },
}))

export default function MessagesPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [messages, setMessages] = useState(mockMessages)
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [newMessage, setNewMessage] = useState("")

  useEffect(() => {
    // Check authentication
    if (status === "unauthenticated") {
      router.push("/login")
      return
    }

    // Fetch messages
    const fetchMessages = async () => {
      try {
        const response = await fetch("/api/client/messages")
        if (response.ok) {
          const data = await response.json()
          setMessages(data)
        } else {
          // If API fails, use mock data
          setMessages(mockMessages)
        }
        setIsLoading(false)
      } catch (error) {
        console.error("Failed to fetch messages:", error)
        setMessages(mockMessages)
        setIsLoading(false)
      }
    }

    if (status === "authenticated") {
      fetchMessages()
    }
  }, [status, router]); // Added router as a dependency

  const filteredMessages = messages.filter(
    (message) =>
      message.content.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleSendMessage = async () => {
    try {
      if (!newMessage.trim()) {
        toast.error("Please enter a message")
        return
      }

      const response = await fetch("/api/client/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newMessage }),
      })

      if (response.ok) {
        const sentMessage = await response.json()
        // Add client-side representation of the message
        const clientMessage = {
          id: sentMessage.id || `temp-${Date.now()}`,
          content: newMessage,
          isRead: false,
          createdAt: new Date(),
          sender: {
            id: session?.user?.id || "client-1",
            name: "You",
          },
        }
        setMessages([clientMessage, ...messages])
        setNewMessage("")
        toast.success("Message sent successfully")
      } else {
        const error = await response.json()
        toast.error(error.message || "Failed to send message")
      }
    } catch (error) {
      console.error("Failed to send message:", error)
      toast.error("An error occurred while sending the message")
    }
  }

  if (status === "loading" || isLoading) {
    return (
      <ClientLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
        </div>
      </ClientLayout>
    )
  }

  return (
    <ClientLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Messages</h2>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-2/3 space-y-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search messages..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="space-y-4">
              {filteredMessages.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-8 text-muted-foreground">
                    No messages found. Start a conversation!
                  </CardContent>
                </Card>
              ) : (
                filteredMessages.map((message) => (
                  <Card key={message.id} className={message.isRead ? "" : "border-l-4 border-l-red-600"}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Avatar>
                            <AvatarImage src={message.sender.id.startsWith("admin") ? "/placeholder.svg?height=40&width=40" : ""} />
                            <AvatarFallback>{message.sender.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-sm">{message.sender.name}</CardTitle>
                            <CardDescription className="text-xs">
                              {format(new Date(message.createdAt), "MMM d, yyyy h:mm a")}
                            </CardDescription>
                          </div>
                        </div>
                        {!message.isRead && message.sender.id.startsWith("admin") && (
                          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
                            New
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">{message.content}</p>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>

            <div className="flex items-center justify-end space-x-2 py-4">
              <Button variant="outline" size="sm">
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="w-full md:w-1/3">
            <Card>
              <CardHeader>
                <CardTitle>Send a Message</CardTitle>
                <CardDescription>
                  Send a message to our team. We'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Type your message here..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  rows={5}
                />
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-red-600 hover:bg-red-700" onClick={handleSendMessage}>
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </ClientLayout>
  )
}
