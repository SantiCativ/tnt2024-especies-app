import { useEffect, useState } from "react";

import { useAuth } from "../context/AuthContext";

import { addLike, removeLike, subscribeToLikes } from "../services/likes.service";

import { router } from "expo-router";

type LikesState = {
    likesCount: number | null;
    hasLiked: boolean;
};

export const useLikes = (speciesId: number) => {
    const { user } = useAuth();
    
    const [likes, setLikes] = useState<LikesState>({
        likesCount: null,
        hasLiked: false,
    });

    useEffect(() => {

        const unsubscribe = subscribeToLikes(
            speciesId,
            user?.uid,
            setLikes
        );

        return unsubscribe;
    }, [speciesId, user]);

    const toggleLike = async () => {

        if (!user) {
            router.push("/login");
            return;
        }

        if (likes.hasLiked) {
            await removeLike(speciesId, user.uid);
        } else {
            await addLike(speciesId, user.uid);
        }
    };

    return {
        ...likes,
        toggleLike,
    };
};