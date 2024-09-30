
'use client'

import { useState, useRef, useEffect } from 'react'
import { useChat } from 'ai/react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { PlusIcon, SendIcon, ImageIcon, UserIcon, BotIcon, MenuIcon, SunIcon, MoonIcon, LoaderIcon } from 'lucide-react'

export default function Component() {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/chat',
  })
  const [darkMode, setDarkMode] = useState(false)
  const [loading, setLoading] = useState(false) // New state for loading status
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImageUrl(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true) // Set loading to true when form is submitted

    if (imageUrl && messages.length === 0) {
      const imageDescription = await performImageRecognition(imageUrl) // Use actual image recognition function
      handleSubmit(e, {
        options: {
          body: JSON.stringify({ imageDescription }),
        }
      })
    } else {
      handleSubmit(e)
    }

    setLoading(false) // Set loading to false after form submission
  }

  // Mock function: Replace with an actual API call to a backend service for image recognition
  const performImageRecognition = async (imageUrl: string) => {
    await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulate network delay
    return "This image appears to show a beautiful landscape with mountains and a lake."
  }

  return (
    <div className={`flex h-screen transition-all duration-300 ${darkMode ? 'dark' : ''}`}>
      {/* Sidebar */}
      <div className="hidden md:flex md:flex-col md:w-[260px] bg-gray-900 text-white">
        <div className="p-4">
          <Button variant="outline" className="w-full justify-start text-white border-white/20">
            <PlusIcon className="mr-2 h-4 w-4" />
            New chat
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col bg-white dark:bg-gray-800 transition-all duration-300">
        {/* Header */}
        <header className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <Button variant="ghost" size="icon" className="md:hidden">
            <MenuIcon className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-semibold text-center flex-1 dark:text-white">Image Recognition Chatbot</h1>
          <Button variant="ghost" size="icon" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" />}
          </Button>
        </header>

        {/* Chat messages */}
        <ScrollArea className="flex-1 p-4 space-y-4 overflow-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-start space-x-4 ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.role !== 'user' && (
                <Avatar>
                  <AvatarFallback><BotIcon /></AvatarFallback>
                </Avatar>
              )}
              <div
                className={`rounded-lg p-4 max-w-[80%] transition-all ${
                  message.role === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 dark:text-white'
                }`}
              >
                {message.content}
              </div>
              {message.role === 'user' && (
                <Avatar>
                  <AvatarFallback><UserIcon /></AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {imageUrl && (
            <div className="flex justify-center">
              <img src={imageUrl} alt="Uploaded" className="max-w-full h-auto rounded-lg shadow-lg" />
            </div>
          )}
          {loading && (
            <div className="flex justify-center">
              <LoaderIcon className="animate-spin h-6 w-6 text-blue-500" />
            </div>
          )}
          <div ref={messagesEndRef} />
        </ScrollArea>

        {/* Input area */}
        <div className="p-4 border-t dark:border-gray-700">
          <form onSubmit={handleFormSubmit} className="flex space-x-2">
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
            />
            <label htmlFor="image-upload" className="cursor-pointer">
              <Button type="button" variant="outline" size="icon" className="dark:text-white dark:border-white/20">
                <ImageIcon className="h-4 w-4" />
                <span className="sr-only">Upload image</span>
              </Button>
            </label>
            <Textarea
              value={input}
              onChange={handleInputChange}
              placeholder="Ask about the image or start a new conversation..."
              className="flex-1 p-2 bg-white dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
              rows={1}
            />
            <Button type="submit" size="icon" className="bg-blue-500 hover:bg-blue-600 text-white">
              <SendIcon className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
