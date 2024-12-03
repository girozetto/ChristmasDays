const COLORS = {
    darkest : (hue)=>`hsl(${hue}, 100%, 10%)`,
    darker : (hue)=>`hsl(${hue}, 100%, 30%)`,
    normal : (hue)=>`hsl(${hue}, 100%, 50%)`,
    lighter : (hue)=>`hsl(${hue}, 100%, 70%)`,
    lightest : (hue)=>`hsl(${hue}, 100%, 90%)`
};

export default COLORS;