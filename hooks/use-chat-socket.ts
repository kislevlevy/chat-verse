import { useEffect } from 'react';
import { useSocket } from '@/components/providers/socket-provider';
import { Member, Message, Profile } from '@prisma/client';
import { useQueryClient } from '@tanstack/react-query';

type ChatSocketProps = {
  addKey: string;
  updateKey: string;
  queryKey: string;
};

type MessageWithMemeberNProfile = Message & {
  member: Member & { profile: Profile };
};

export const useChatSocket = ({ addKey, updateKey, queryKey }: ChatSocketProps) => {
  const { socket } = useSocket();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!socket) return;

    socket.on(updateKey, (message: MessageWithMemeberNProfile) => {
      queryClient.setQueryData([queryKey], (oldData: any) => {
        if (!oldData || !oldData.pages || oldData.pages.length === 0) {
          return oldData;
        }
        const newData = oldData.pages.map((page: any) => {
          return {
            ...page,
            items: page.items.map((item: MessageWithMemeberNProfile) => {
              return item.id === message.id ? message : item;
            }),
          };
        });
        return {
          ...oldData,
          pages: newData,
        };
      });
    });

    socket.on(addKey, (message: MessageWithMemeberNProfile) => {
      queryClient.setQueryData([queryKey], (oldData: any) => {
        if (!oldData || !oldData.pages || oldData.pages.length === 0) {
          return { pages: [{ items: [message] }] };
        }
        const newData = [...oldData.pages];
        newData[0] = {
          ...newData[0],
          items: [message, ...newData[0].items],
        };
        return {
          ...oldData,
          pages: newData,
        };
      });
    });

    return () => {
      socket.off(addKey);
      socket.off(updateKey);
    };
  }, [queryClient, addKey, queryKey, socket, updateKey]);
};
