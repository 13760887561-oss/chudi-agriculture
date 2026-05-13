import { useState, useEffect, useCallback } from 'react'
import { supabase, ContactMessage } from '../lib/supabase'

export function useContactMessages() {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchMessages = useCallback(async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setMessages(data || [])
      setError(null)
    } catch (err: any) {
      console.error('Error fetching messages:', err)
      setError(err.message || '获取留言失败')
    } finally {
      setLoading(false)
    }
  }, [])

  const addMessage = async (message: Omit<ContactMessage, 'id' | 'created_at' | 'is_read'>) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert({ ...message, is_read: false })

      if (error) throw error
      await fetchMessages()
      return true
    } catch (err: any) {
      setError(err.message || '发送失败')
      return false
    }
  }

  const markAsRead = async (id: number) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ is_read: true })
        .eq('id', id)

      if (error) throw error
      await fetchMessages()
      return true
    } catch (err: any) {
      setError(err.message || '标记失败')
      return false
    }
  }

  const deleteMessage = async (id: number) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', id)

      if (error) throw error
      await fetchMessages()
      return true
    } catch (err: any) {
      setError(err.message || '删除失败')
      return false
    }
  }

  const unreadCount = messages.filter(m => !m.is_read).length

  useEffect(() => {
    fetchMessages()
  }, [fetchMessages])

  return {
    messages,
    unreadCount,
    loading,
    error,
    addMessage,
    markAsRead,
    deleteMessage,
    refresh: fetchMessages
  }
}