import { Navigate, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Landing from './pages/Landing'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import Input from './pages/Input'
import Diagnosis from './pages/Diagnosis'
import ArgumentMap from './pages/ArgumentMap'
import PitchView from './pages/PitchView'
import Challenge from './pages/Challenge'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route
        path="/app"
        element={
          <Layout>
            <Input />
          </Layout>
        }
      />
      <Route
        path="/app/diagnosis"
        element={
          <Layout>
            <Diagnosis />
          </Layout>
        }
      />
      <Route
        path="/app/map"
        element={
          <Layout>
            <ArgumentMap />
          </Layout>
        }
      />
      <Route
        path="/app/pitch"
        element={
          <Layout>
            <PitchView />
          </Layout>
        }
      />
      <Route
        path="/app/challenge"
        element={
          <Layout>
            <Challenge />
          </Layout>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
