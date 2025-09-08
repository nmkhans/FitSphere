# Dashboard Structure Documentation

This document outlines the organized structure of the FitSphere dashboard system, designed for role-based access and future scalability.

## 📁 **Folder Structure**

```
src/
├── app/
│   └── dashboard/
│       ├── page.js                 # Main member dashboard
│       ├── layout.js               # Dashboard layout (hides navbar/footer)
│       └── admin/
│           ├── page.js             # Admin dashboard
│           └── layout.js           # Admin layout (hides navbar/footer)
│
└── components/
    └── dashboard/
        ├── DashboardLayout.js      # Shared layout component (sidebar, navigation)
        ├── member/                 # Member-specific components
        │   └── MemberOverview.js   # Member dashboard overview
        └── admin/                  # Admin-specific components
            └── SpecializedMembersSection.js  # Admin specialized members management
```

## 🎯 **Role-Based Dashboard System**

### **Member Dashboard** (`/dashboard`)
**Target Users**: Regular gym members (specialized or general)
**Features**:
- Personal overview with membership info
- Upcoming sessions and bookings
- Recent activity tracking
- Health information display
- Quick action buttons
- Profile completion status

**Navigation Items**:
- Overview (default view)

### **Admin Dashboard** (`/dashboard/admin`)  
**Target Users**: Gym administrators and staff
**Features**:
- Specialized member management
- Member registration and tracking
- Health and safety guidelines
- Medical clearance monitoring
- Member statistics

**Navigation Items**:
- Specialized Members Management

## 🔧 **Technical Implementation**

### **Shared Components**
- **DashboardLayout.js**: Handles sidebar, navigation, and user interface
  - Supports role-based navigation
  - Responsive design (mobile/desktop)
  - Fixed sidebar with scrollable content
  - User role indicators

### **Role Detection**
Currently implemented with manual role assignment:
```javascript
userRole="member"  // or "admin"
```

**Future Enhancement**: Will be replaced with database-driven role detection:
```javascript
// Future implementation
const userRole = session?.user?.role || "member";
```

### **Navigation System**
The navigation adapts based on user role:

```javascript
const getNavigationItems = () => {
  switch (userRole) {
    case "admin":
      return [{ name: "Specialized Members", id: "specialized-members", icon: Heart }];
    case "member":
    default:
      return [{ name: "Overview", id: "overview", icon: Home }];
  }
};
```

## 🚀 **Future Enhancements Ready**

### **Additional Roles**
The structure is prepared for:
- **Trainer Role**: Personal training management
- **Manager Role**: Gym operations oversight
- **Receptionist Role**: Front desk operations

### **Additional Member Features**
- Workout plan viewing
- Diet plan access
- Progress tracking
- Session booking
- Payment history
- Health record management

### **Additional Admin Features**
- Member analytics
- Trainer management
- Equipment tracking
- Financial reporting
- System settings

## 🔒 **Security Considerations**

### **Current Implementation**
- Session-based authentication via NextAuth
- Route protection (redirects to login if not authenticated)
- UI role-based rendering

### **Future Security Enhancements**
- Database-driven role verification
- API endpoint role-based access control
- Admin action logging
- Permission-based feature access

## 📱 **Responsive Design**

- **Desktop**: Fixed sidebar with collapsible functionality
- **Mobile**: Overlay sidebar with touch-friendly navigation
- **Tablet**: Adaptive layout based on screen size

## 🎨 **Design Consistency**

- **Shared Components**: Consistent UI across all roles
- **Role Indicators**: Clear visual distinction (admin badge)
- **Color Coding**: Role-appropriate color schemes
- **Icon System**: Consistent iconography

## 🔄 **Development Workflow**

### **Adding New Member Features**
1. Create component in `components/dashboard/member/`
2. Add navigation item to member navigation
3. Update member dashboard page routing

### **Adding New Admin Features**  
1. Create component in `components/dashboard/admin/`
2. Add navigation item to admin navigation
3. Update admin dashboard page routing

### **Adding New Roles**
1. Create role-specific folder in `components/dashboard/[role]/`
2. Create role-specific page in `app/dashboard/[role]/`
3. Update `DashboardLayout.js` navigation logic
4. Implement role-based access control

This structure ensures maintainable, scalable, and organized dashboard development while keeping all dashboard-related functionality centralized but properly separated by user roles.
