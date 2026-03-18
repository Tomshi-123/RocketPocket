import { useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";
import { COLORS } from "../theme/colors";

type FiltProps = {
  value: string;
  options: string[];
  onChange: (next: string) => void;
};

export default function Filt({ value, options, onChange }: FiltProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Pressable
        onPress={() => setOpen(true)}
        style={{
          marginTop: 14,
          marginBottom: 6,
          alignSelf: "flex-start",
          paddingHorizontal: 12,
          paddingVertical: 8,
          borderRadius: 999,
          borderWidth: 1,
          borderColor: COLORS.borderNeon,
          backgroundColor: "rgba(0, 242, 255, 0.12)",
        }}
      >
        <Text
          style={{ color: COLORS.primaryNeon, fontSize: 12, fontWeight: "700" }}
        >
          Company: {value} ▾
        </Text>
      </Pressable>

      <Modal transparent visible={open} animationType="fade">
        <Pressable
          onPress={() => setOpen(false)}
          style={{
            flex: 1,
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            paddingHorizontal: 24,
          }}
        >
          <View
            style={{
              backgroundColor: COLORS.surface,
              borderRadius: 14,
              borderWidth: 1,
              borderColor: COLORS.border,
              padding: 10,
              gap: 8,
            }}
          >
            {options.map((option) => {
              const selected = option === value;

              return (
                <Pressable
                  key={option}
                  onPress={() => {
                    onChange(option);
                    setOpen(false);
                  }}
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: selected ? COLORS.primaryNeon : COLORS.border,
                    backgroundColor: selected
                      ? "rgba(0, 242, 255, 0.16)"
                      : COLORS.surfaceTranslucent,
                  }}
                >
                  <Text
                    style={{
                      color: selected ? COLORS.primaryNeon : COLORS.textPrimary,
                      fontSize: 13,
                      fontWeight: "600",
                    }}
                  >
                    {option}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </Pressable>
      </Modal>
    </>
  );
}
