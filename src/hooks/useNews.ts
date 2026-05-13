import { useState, useEffect, useCallback } from 'react'
import { supabase, News } from '../lib/supabase'

export function useNews() {
  const [news, setNews] = useState<News[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchNews = useCallback(async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setNews(data || [])
      setError(null)
    } catch (err: any) {
      console.error('Error fetching news:', err)
      setError(err.message || '获取新闻失败')
    } finally {
      setLoading(false)
    }
  }, [])

  const addNews = async (newsItem: Omit<News, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { error } = await supabase
        .from('news')
        .insert(newsItem)

      if (error) throw error
      await fetchNews()
      return true
    } catch (err: any) {
      setError(err.message || '添加失败')
      return false
    }
  }

  const updateNews = async (id: number, newsItem: Partial<News>) => {
    try {
      const { error } = await supabase
        .from('news')
        .update({ ...newsItem, updated_at: new Date().toISOString() })
        .eq('id', id)

      if (error) throw error
      await fetchNews()
      return true
    } catch (err: any) {
      setError(err.message || '更新失败')
      return false
    }
  }

  const deleteNews = async (id: number) => {
    try {
      const { error } = await supabase
        .from('news')
        .delete()
        .eq('id', id)

      if (error) throw error
      await fetchNews()
      return true
    } catch (err: any) {
      setError(err.message || '删除失败')
      return false
    }
  }

  const togglePublish = async (id: number, isPublished: boolean) => {
    return updateNews(id, { is_published: isPublished })
  }

  useEffect(() => {
    fetchNews()
  }, [fetchNews])

  return {
    news,
    loading,
    error,
    addNews,
    updateNews,
    deleteNews,
    togglePublish,
    refresh: fetchNews
  }
}