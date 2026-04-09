import React from 'react';
import { View, Text, TouchableOpacity, useWindowDimensions } from 'react-native';
import { useColorScheme } from 'nativewind';
import { ChevronRight, ChevronLeft, X, Sparkles } from 'lucide-react-native';

import { TooltipProps, useCopilot } from 'react-native-copilot';

export default function CustomTooltip({ labels }: TooltipProps) {
  const { isFirstStep, isLastStep, goToNext, goToPrev, stop, currentStep } = useCopilot();

  const handleNext = goToNext;
  const handlePrev = goToPrev;
  const handleStop = stop;
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { width } = useWindowDimensions();

  // Se è uno step della mappa/badge, mostra le scintille
  const isSpecialStep = currentStep?.name === 'badge' || currentStep?.name === 'theme';

  return (
    <View 
      className="bg-white/95 dark:bg-slate-900/95 overflow-hidden rounded-[24px] shadow-lg shadow-black/20"
      style={{ elevation: 15 }}
    >
      {/* Intestazione */}
      <View className="flex-row items-center justify-between px-5 pt-5 pb-2">
        <View className="flex-row items-center">
            {isSpecialStep ? (
                <Sparkles size={20} color={isDark ? '#FDE047' : '#F59E0B'} style={{ marginRight: 8 }} />
            ) : null}
            <Text className="text-slate-800 dark:text-white font-bold text-lg">
                Esplora
            </Text>
        </View>
        <TouchableOpacity 
            onPress={handleStop} 
            className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 items-center justify-center"
        >
          <X size={16} color={isDark ? '#cbd5e1' : '#64748b'} />
        </TouchableOpacity>
      </View>

      {/* Contenuto Testo */}
      <View className="px-5 pb-6 pt-1">
        <Text className="text-slate-600 dark:text-slate-300 text-[16px] leading-[24px]">
          {currentStep?.text || ''}
        </Text>
      </View>

      {/* Pulsantiera in Basso */}
      <View className="flex-row items-center justify-between px-5 py-4 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50">
        
        {/* Sinistra: Indietro o Salta (se è il primo step non serve salto) */}
        {!isFirstStep ? (
          <TouchableOpacity onPress={handlePrev} className="flex-row items-center px-3 py-2">
            <ChevronLeft size={18} color="#0ea5e9" />
            <Text className="text-sky-500 font-semibold ml-1">Prec.</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleStop} className="px-3 py-2">
            <Text className="text-slate-400 dark:text-slate-500 font-medium">Salta tutto</Text>
          </TouchableOpacity>
        )}

        {/* Destra: Avanti o Fine */}
        <TouchableOpacity 
          onPress={isLastStep ? handleStop : handleNext} 
          className="bg-sky-500 rounded-full px-5 py-2.5 flex-row items-center shadow-sm"
        >
          <Text className="text-white font-bold mr-1">
            {isLastStep ? "Ho Capito!" : "Avanti"}
          </Text>
          {!isLastStep && <ChevronRight size={18} color="white" />}
        </TouchableOpacity>

      </View>
    </View>
  );
}
