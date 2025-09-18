import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { User, CreateUserRequest } from '../types';
import { apiClient } from '../lib/api';

// Query keys
export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  list: (filters: string) => [...userKeys.lists(), { filters }] as const,
  details: () => [...userKeys.all, 'detail'] as const,
  detail: (id: string) => [...userKeys.details(), id] as const,
};

// Get all users
export function useUsers() {
  return useQuery({
    queryKey: userKeys.lists(),
    queryFn: () => apiClient.getUsers(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Get single user
export function useUser(id: number) {
  return useQuery({
    queryKey: userKeys.detail(id.toString()),
    queryFn: () => apiClient.getUser(id),
    enabled: !!id,
  });
}

// Create user mutation
export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData: CreateUserRequest) => apiClient.createUser(userData),
    onSuccess: () => {
      // Invalidate and refetch users list
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
}

// Delete user mutation
export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => apiClient.deleteUser(id),
    onSuccess: (_, deletedId) => {
      // Remove from cache and invalidate lists
      queryClient.removeQueries({ queryKey: userKeys.detail(deletedId.toString()) });
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
}
