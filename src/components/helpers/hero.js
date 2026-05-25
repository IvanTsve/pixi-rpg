export const calculateHeroMovement = ({x, y}, delta, keysPressed, keyActions, defaultScale) => {
    let isMoving = false;
    let position = {
     x: x,
     y: y,
    };
    var action = null;
    for (const key of keysPressed.current) {
        action = keyActions[key];
        
        if (action) {
            position.x += action.dx * delta.deltaTime;
            position.y += action.dy * delta.deltaTime;
            isMoving = true;
        }
    }
   return { position, isMoving, scaleX: action ? action.scaleX : defaultScale };
}