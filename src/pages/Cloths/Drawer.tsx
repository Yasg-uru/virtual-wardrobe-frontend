
import { useState, useEffect } from 'react'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FaFilter } from "react-icons/fa"
import { IClothItem } from '@/types/clothState'


interface FilterDrawerProps {
  collections: IClothItem[]
  onFilter: (filteredItems: IClothItem[]) => void
}

export function FilterDrawer({ collections, onFilter }: FilterDrawerProps) {
  const [filters, setFilters] = useState({
    category: '',
    condition: '',
    brand: '',
    size: '',
    material: '',
    color: '',
    season: '',
    weather: '',
    isFavorite: false,
    isArchived: false,
    minCost: 0,
    maxCost: 1000,
    minWearCount: 0,
    maxWearCount: 100,
  })

  const [uniqueValues, setUniqueValues] = useState({
    brands: [] as string[],
    sizes: [] as string[],
    materials: [] as string[],
    colors: [] as string[],
  })

  useEffect(() => {
    const brands = [...new Set(collections.map((item) => item.brand))]
    const sizes = [...new Set(collections.map((item) => item.size))]
    const materials = [...new Set(collections.map((item) => item.material))]
    const colors = [...new Set(collections.map((item) => item.color))]

    setUniqueValues({ brands, sizes, materials, colors })
  }, [collections])

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const applyFilters = () => {
    const filteredItems = collections.filter((item) => {
      return (
        (filters.category === '' || item.category === filters.category) &&
        (filters.condition === '' || item.condition === filters.condition) &&
        (filters.brand === '' || item.brand === filters.brand) &&
        (filters.size === '' || item.size === filters.size) &&
        (filters.material === '' || item.material === filters.material) &&
        (filters.color === '' || item.color === filters.color) &&
        (filters.season === '' || item.seasonSuitability[filters.season as keyof typeof item.seasonSuitability]) &&
        (filters.weather === '' || item.weatherSuitability[filters.weather as keyof typeof item.weatherSuitability]) &&
        (!filters.isFavorite || item.isFavorite) &&
        (!filters.isArchived || item.isArchived) &&
        item.cost >= filters.minCost &&
        item.cost <= filters.maxCost &&
        item.wearcount >= filters.minWearCount &&
        item.wearcount <= filters.maxWearCount
      )
    })

    onFilter(filteredItems)
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-2 px-4 rounded-md shadow-md hover:shadow-lg transition duration-300">
          Apply Filter <FaFilter className="ml-2" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filter Your Wardrobe</SheetTitle>
          <SheetDescription>
            Apply filters to find your clothes easily.
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-10rem)] mt-4">
          <div className="space-y-6">
            <FilterSelect
              label="Category"
              value={filters.category}
              onChange={(value) => handleFilterChange('category', value)}
              options={['Top', 'Bottom', 'Accessory', 'Footwear', 'Outerwear', 'Other']}
            />
            <FilterSelect
              label="Condition"
              value={filters.condition}
              onChange={(value) => handleFilterChange('condition', value)}
              options={['New', 'Good', 'Worn', 'Needs Repair']}
            />
            <FilterSelect
              label="Brand"
              value={filters.brand}
              onChange={(value) => handleFilterChange('brand', value)}
              options={uniqueValues.brands}
            />
            <FilterSelect
              label="Size"
              value={filters.size}
              onChange={(value) => handleFilterChange('size', value)}
              options={uniqueValues.sizes}
            />
            <FilterSelect
              label="Material"
              value={filters.material}
              onChange={(value) => handleFilterChange('material', value)}
              options={uniqueValues.materials}
            />
            <FilterSelect
              label="Color"
              value={filters.color}
              onChange={(value) => handleFilterChange('color', value)}
              options={uniqueValues.colors}
            />
            <FilterSelect
              label="Season"
              value={filters.season}
              onChange={(value) => handleFilterChange('season', value)}
              options={['isWinter', 'isSummer', 'isSpring', 'isAutumn']}
            />
            <FilterSelect
              label="Weather"
              value={filters.weather}
              onChange={(value) => handleFilterChange('weather', value)}
              options={['isWindSuitable', 'isRainSuitable', 'isSnowySuitable', 'isCloudySuitable', 'isSunnySuitable']}
            />
            <div className="space-y-2">
              <Label>Preferences</Label>
              <div className="flex space-x-4">
                <Checkbox
                  id="isFavorite"
                  checked={filters.isFavorite}
                  onCheckedChange={(checked) => handleFilterChange('isFavorite', checked)}
                />
                <Label htmlFor="isFavorite">Favorites</Label>
                <Checkbox
                  id="isArchived"
                  checked={filters.isArchived}
                  onCheckedChange={(checked) => handleFilterChange('isArchived', checked)}
                />
                <Label htmlFor="isArchived">Archived</Label>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Cost Range</Label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  value={filters.minCost}
                  onChange={(e) => handleFilterChange('minCost', Number(e.target.value))}
                  className="w-20 p-1 border rounded"
                />
                <Slider
                  min={0}
                  max={1000}
                  step={10}
                  value={[filters.minCost, filters.maxCost]}
                  onValueChange={([min, max]) => {
                    handleFilterChange('minCost', min)
                    handleFilterChange('maxCost', max)
                  }}
                  className="w-full"
                />
                <input
                  type="number"
                  value={filters.maxCost}
                  onChange={(e) => handleFilterChange('maxCost', Number(e.target.value))}
                  className="w-20 p-1 border rounded"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Wear Count Range</Label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  value={filters.minWearCount}
                  onChange={(e) => handleFilterChange('minWearCount', Number(e.target.value))}
                  className="w-20 p-1 border rounded"
                />
                <Slider
                  min={0}
                  max={100}
                  step={1}
                  value={[filters.minWearCount, filters.maxWearCount]}
                  onValueChange={([min, max]) => {
                    handleFilterChange('minWearCount', min)
                    handleFilterChange('maxWearCount', max)
                  }}
                  className="w-full"
                />
                <input
                  type="number"
                  value={filters.maxWearCount}
                  onChange={(e) => handleFilterChange('maxWearCount', Number(e.target.value))}
                  className="w-20 p-1 border rounded"
                />
              </div>
            </div>
          </div>
        </ScrollArea>
        <SheetFooter className="mt-4">
          <Button onClick={applyFilters} className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white">
            Apply Filters
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

function FilterSelect({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: string[] }) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder={`Select ${label}`} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{/* Changed default value to "all" */ }All {label}s</SelectItem>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

