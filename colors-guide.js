import React from "react";

const colors = () => {
  return (
    <div>
      {/* How to use */}
      <View className="card">
        <Text className="text-text-primary font-semibold">Card Content</Text>
      </View>
      <View className="card-lg">
        <Text className="text-text-primary text-lg font-bold">Large Card</Text>
      </View>
      // BUTTONS
      <TouchableOpacity className="btn-primary">
        <Text className="text-text-inverse font-semibold text-center">
          Primary Button
        </Text>
      </TouchableOpacity>
      <TouchableOpacity className="btn-secondary">
        <Text className="text-primary font-medium text-center">
          Secondary Button
        </Text>
      </TouchableOpacity>
      <TouchableOpacity className="btn-disabled" disabled>
        <Text className="text-text-muted font-medium text-center">
          Disabled Button
        </Text>
      </TouchableOpacity>
      // INPUTS
      <TextInput
        className="input"
        placeholder="Enter text..."
        placeholderTextColor="#9ca3af"
      />
      <TextInput className="input input-focus" placeholder="Focused input..." />
      <TextInput className="input input-error" placeholder="Error input..." />
      // FODMAP BADGES
      <View className="badge-low">
        <Text className="text-white text-xs font-medium">LOW</Text>
      </View>
      <View className="badge-moderate">
        <Text className="text-white text-xs font-medium">MODERATE</Text>
      </View>
      <View className="badge-high">
        <Text className="text-white text-xs font-medium">HIGH</Text>
      </View>
      // SYMPTOM SEVERITY
      <View className="bg-symptom-1 px-2 py-1 rounded">
        <Text className="text-white text-xs">Mild</Text>
      </View>
      <View className="bg-symptom-5 px-2 py-1 rounded">
        <Text className="text-white text-xs">Severe</Text>
      </View>
      // ALERTS
      <View className="alert-success">
        <Text className="text-success font-medium">Success message!</Text>
      </View>
      <View className="alert-warning">
        <Text className="text-warning font-medium">Warning message!</Text>
      </View>
      <View className="alert-error">
        <Text className="text-error font-medium">Error message!</Text>
      </View>
      // SURFACES
      <View className="bg-surface-primary p-4">
        <Text>Primary surface (white)</Text>
      </View>
      <View className="bg-surface-secondary p-4">
        <Text>Secondary surface (light gray)</Text>
      </View>
      // LAYOUT
      <View className="screen-padding">
        <View className="section-spacing">
          <Text className="text-text-primary text-xl font-bold mb-2">
            Section Title
          </Text>
          <Text className="text-text-secondary">Section content...</Text>
        </View>
      </View>
      // SPACING UTILITIES
      <View className="p-xs">Extra small padding</View>
      <View className="p-sm">Small padding</View>
      <View className="p-md">Medium padding</View>
      <View className="p-lg">Large padding</View>
      <View className="p-xl">Extra large padding</View>
      <View className="mb-xs">Extra small margin bottom</View>
      <View className="mb-sm">Small margin bottom</View>
      <View className="mb-md">Medium margin bottom</View>
      <View className="mb-lg">Large margin bottom</View>
      // BORDERS
      <View className="border border-border-light p-4">Light border</View>
      <View className="border border-border p-4">Default border</View>
      <View className="border border-border-dark p-4">Dark border</View>
      // TEXT COLORS
      <Text className="text-text-primary">Primary text</Text>
      <Text className="text-text-secondary">Secondary text</Text>
      <Text className="text-text-muted">Muted text</Text>
      <Text className="text-text-placeholder">Placeholder text</Text>
      <Text className="text-text-inverse">White text</Text>
      // COMPLETE COMPONENT EXAMPLE const FoodCard = ({food}) => (
      <View className="card section-spacing">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-text-primary font-semibold text-lg">
            {food.name}
          </Text>
          <View className={`badge-${food.fodmap_level}`}>
            <Text className="text-white text-xs font-medium uppercase">
              {food.fodmap_level}
            </Text>
          </View>
        </View>
        <Text className="text-text-secondary mb-1">{food.category}</Text>
        <Text className="text-text-muted text-sm">{food.safe_serving}</Text>
      </View>
    </div>
  );
};

export default colors - guide;
