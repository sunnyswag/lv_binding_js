import { View, Render, Text, Button, Slider, DefaultGroup, Dimensions } from 'lvgljs-ui';
import React, { useState } from 'react';

const { width, height } = Dimensions.window;

function App() {
    const [showSlider, setShowSlider] = useState(true);

    return (
        <View style={style.window}>
            <View style={style.header}>
                <Text style={style.headerText}>Header (not in group)</Text>
                <Button 
                    style={style.toggleBtn}
                    onClick={() => setShowSlider(!showSlider)}
                >
                    <Text>{showSlider ? 'Hide Slider' : 'Show Slider'}</Text>
                </Button>
            </View>

            <View group={DefaultGroup} style={style.content}>
                <Text style={style.contentText}>Content (in group, use keyboard to navigate)</Text>
                
                <Button 
                    style={style.button}
                    onFocusedStyle={style.buttonFocused}
                >
                    <Text>Button 1</Text>
                </Button>

                {showSlider && (
                    <Slider 
                        style={style.slider}
                        onFocusedStyle={style.sliderFocused}
                        value={50}
                    />
                )}

                <Button 
                    style={style.button}
                    onFocusedStyle={style.buttonFocused}
                >
                    <Text>Button 2</Text>
                </Button>
            </View>
        </View>
    );
}

const style = {
    window: {
        width,
        height,
        display: 'flex',
        'flex-direction': 'column',
    },
    header: {
        height: 80,
        'background-color': '#f0f0f0',
        display: 'flex',
        'align-items': 'center',
        'padding-left': 20,
    },
    headerText: {
        'text-color': '#333',
    },
    toggleBtn: {
        width: 140,
        height: 40,
        'margin-left': 20,
        'background-color': '#2196f3',
    },
    content: {
        flex: 1,
        padding: 20,
        display: 'flex',
        'flex-direction': 'column',
        'row-spacing': 15,
    },
    contentText: {
        'text-color': '#666',
        'margin-bottom': 10,
    },
    button: {
        width: 200,
        height: 50,
        'border-width': 2,
        'border-color': '#ccc',
        'background-color': '#ffffff',
        display: 'flex',
        'justify-content': 'center',
        'align-items': 'center',
    },
    buttonFocused: {
        'border-width': 3,
        'border-color': '#ff0000',
        'background-color': '#ffe0e0',
    },
    slider: {
        width: 200,
        height: 20,
    },
    sliderFocused: {
        'background-color': '#e0ffe0',
    },
};

Render.render(<App />);

