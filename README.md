# ByeWind Dashboard

A modern, responsive React dashboard application built with TypeScript, featuring dark/light mode, interactive charts, and beautiful animations.

## 🚀 Features

- **Modern Design**: Pixel-perfect replica of the provided dashboard designs
- **Dark/Light Mode**: Full theme switching with persistent preferences
- **Responsive Layout**: Optimized for all devices and zoom levels
- **Interactive Charts**: Built with Highcharts for rich data visualization
- **Smooth Animations**: Framer Motion for micro-interactions and transitions
- **Real Data**: Integrated with public APIs for realistic data
- **TypeScript**: Full type safety and excellent developer experience
- **Modular Architecture**: Clean, maintainable, and scalable code structure

## 📱 Screenshots

The dashboard includes:
- **Overview Page**: KPI metrics, revenue trends, and location analytics
- **Orders Management**: Data table with filtering and status management
- **Responsive Design**: Mobile-friendly navigation and layouts
- **Notifications**: Interactive notification dropdown
- **Theme Switching**: Seamless light/dark mode transitions

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: CSS3 with CSS Custom Properties
- **Charts**: Highcharts + Highcharts React
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Data**: Axios + JSONPlaceholder API

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── charts/          # Chart components (Bar, Line, Pie, Area, WorldMap)
│   ├── layout/          # Layout components (Header, Sidebar, Layout)
│   └── ui/              # UI components (MetricCard, Loading, Notifications)
├── contexts/            # React contexts (ThemeContext)
├── pages/               # Page components (Dashboard, Orders)
├── services/            # API services and data fetching
├── types/               # TypeScript type definitions
└── utils/               # Utility functions
```

## 🎨 Theme System

The application uses a comprehensive theme system with:
- CSS Custom Properties for dynamic theming
- React Context for state management
- Local storage persistence
- Smooth transitions between themes

### Theme Colors

**Light Mode**:
- Primary: `#2563eb`
- Background: `#ffffff`
- Surface: `#f8fafc`
- Text: `#1e293b`

**Dark Mode**:
- Primary: `#3b82f6`
- Background: `#0f172a`
- Surface: `#1e293b`
- Text: `#f1f5f9`

## 📊 Charts & Visualizations

### Chart Types Implemented

1. **Bar Charts**: Projections vs Actuals with animated bars
2. **Line Charts**: Revenue trends with multiple series
3. **Pie Charts**: Revenue distribution by location
4. **Area Charts**: Smooth area charts for trend analysis
5. **World Map**: Location-based data visualization

### Chart Features

- Interactive tooltips
- Smooth animations
- Theme-aware colors
- Responsive design
- Real-time data updates

## 📱 Responsive Design

### Breakpoints

- **Mobile**: `< 768px`
- **Tablet**: `768px - 1024px`
- **Desktop**: `> 1024px`
- **Large Screens**: `> 1400px`

### Mobile Optimizations

- Collapsible sidebar with overlay
- Card-based table layout
- Touch-friendly interactions
- Optimized typography scaling
- Landscape orientation support

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

## 🌐 API Integration

The dashboard uses multiple data sources:

1. **JSONPlaceholder**: For users and orders data
2. **Mock Data Generator**: For metrics and analytics
3. **Weather API**: For additional environmental data

### Data Services

```typescript
// Example API usage
import { apiService } from './services/api';

const data = await apiService.fetchOrders();
const metrics = apiService.generateMockData();
```

## 🎭 Animations & Interactions

### Micro-interactions

- **Hover Effects**: Subtle scale and color transitions
- **Loading States**: Skeleton loaders and spinners
- **Page Transitions**: Smooth enter/exit animations
- **Notification System**: Slide-in notifications
- **Chart Animations**: Animated data visualization

### Performance

- **Lazy Loading**: Components loaded on demand
- **Memoization**: Optimized re-renders
- **Debounced Search**: Efficient filtering
- **Virtual Scrolling**: Large data set handling

## 🔒 Browser Support

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

## 📈 Performance Features

- **Bundle Splitting**: Automatic code splitting
- **Tree Shaking**: Dead code elimination
- **Asset Optimization**: Optimized images and fonts
- **Caching**: Browser cache optimization
- **Accessibility**: WCAG 2.1 compliant

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

The `dist` folder contains the production build ready for deployment.

### Docker Deployment

#### Using Docker Compose (Recommended)

1. **Build and run with Docker Compose**
   ```bash
   docker-compose up --build
   ```

2. **Run in background**
   ```bash
   docker-compose up -d --build
   ```

3. **Stop the application**
   ```bash
   docker-compose down
   ```

The application will be available at `http://localhost:3000`

#### Using Docker directly

1. **Build the Docker image**
   ```bash
   docker build -t dashboard-app .
   ```

2. **Run the container**
   ```bash
   docker run -p 3000:80 dashboard-app
   ```

#### Docker Configuration

- **Dockerfile**: Multi-stage build using Node.js for building and Nginx for serving
- **docker-compose.yml**: Simple orchestration with port mapping
- **.dockerignore**: Excludes unnecessary files from build context

### Environment Variables

Create a `.env` file for environment-specific configurations:

```env
VITE_API_BASE_URL=https://api.example.com
VITE_APP_NAME=ByeWind Dashboard
```

## 🧪 Testing

The application includes:

- **Component Testing**: Individual component tests
- **Integration Testing**: Page-level functionality
- **E2E Testing**: Complete user workflows
- **Accessibility Testing**: Screen reader compatibility

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Design inspiration from modern dashboard interfaces
- Highcharts for excellent charting capabilities
- Framer Motion for smooth animations
- The React community for amazing tools and libraries

## 📞 Support

For support, email [your-email] or create an issue in the repository.

---

Built with ❤️ using React, TypeScript, and modern web technologies.