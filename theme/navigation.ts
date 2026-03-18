import { COLORS } from "./colors";

export const tabsScreenOptions = {
  headerStyle: {
    backgroundColor: COLORS.headerBackground,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.accentNeon,
    shadowColor: COLORS.accentNeon,
    shadowOpacity: 0.35,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 10,
  },
  headerTitleAlign: "center" as const,
  headerShadowVisible: false,
  headerTitleStyle: { fontWeight: "700" as const, color: COLORS.textPrimary },
  headerTintColor: COLORS.textPrimary,
  tabBarActiveTintColor: COLORS.primaryNeon,
  tabBarInactiveTintColor: COLORS.tabInactive,
  tabBarStyle: {
    backgroundColor: COLORS.headerBackground,
    borderTopWidth: 1,
    borderTopColor: COLORS.accentNeon,
    shadowColor: COLORS.accentNeon,
    shadowOpacity: 0.45,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: -2 },
    elevation: 14,
    height: 62,
    paddingTop: 6,
    paddingBottom: 8,
  },
};

export const neonHeaderOptions = {
  headerStyle: {
    backgroundColor: COLORS.headerBackground,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.accentNeon,
    shadowColor: COLORS.accentNeon,
    shadowOpacity: 0.35,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 10,
  },
  headerTintColor: COLORS.textPrimary,
  headerTitleStyle: {
    color: COLORS.textPrimary,
    fontWeight: "700" as const,
    textShadowColor: COLORS.primaryNeon,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
    fontSize: 18,
  },
};
