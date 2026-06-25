import { FRAME_DURATION } from '../../lib/constants';

export const createAnimationState = () => ({
    frameIndex: 0,
    animationTimer: 0,
    wasMoving: false,
    isAttacking: false,
    attackFrameIndex: 0,
    attackAnimationTimer: 0,
});

export const startAttack = (state, sprite, attackTextures) => {
    if (state.isAttacking || !attackTextures.length) return false;

    state.isAttacking = true;
    state.attackFrameIndex = 0;
    state.attackAnimationTimer = 0;
    if (sprite && attackTextures[0]) {
        sprite.texture = attackTextures[0];
    }
    return true;
};

export const updateCharacterAnimation = (
    state,
    { deltaMS, isMoving, sprite, walkTextures, attackTextures, frameDuration = FRAME_DURATION }
) => {
    if (!sprite || !walkTextures.length) return;

    if (isMoving) {
        state.wasMoving = true;
        state.animationTimer += deltaMS;

        if (state.animationTimer >= frameDuration) {
            state.animationTimer -= frameDuration;
            state.frameIndex = (state.frameIndex + 1) % walkTextures.length;
            sprite.texture = walkTextures[state.frameIndex];
        }
        return;
    }

    if (state.wasMoving) {
        state.wasMoving = false;
        state.frameIndex = 0;
        sprite.texture = walkTextures[state.frameIndex];
        return;
    }

    if (!state.isAttacking) return;

    state.attackAnimationTimer += deltaMS;
    if (state.attackAnimationTimer < frameDuration) return;

    state.attackAnimationTimer -= frameDuration;
    state.attackFrameIndex += 1;

    if (state.attackFrameIndex >= attackTextures.length) {
        state.isAttacking = false;
        state.attackFrameIndex = 0;
        sprite.texture = walkTextures[state.frameIndex];
        return;
    }

    sprite.texture = attackTextures[state.attackFrameIndex];
};
