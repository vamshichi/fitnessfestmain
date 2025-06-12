"use client"

import { useState, useEffect, useMemo } from "react"
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  getFilteredRowModel,
  type ColumnFiltersState,
} from "@tanstack/react-table"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Download } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import * as XLSX from "xlsx"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  filterColumn?: string
  // Generic filter options
  filterOptions?: {
    key: string
    label: string
    values: string[]
  }
  // Legacy support for contact types
  contactTypes?: string[]
  // File name for export
  exportFileName?: string
}

export function DataTable<TData, TValue>({
  columns,
  data,
  filterColumn,
  filterOptions,
  contactTypes = [],
  exportFileName = "export",
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined)
  const [filteredData, setFilteredData] = useState<TData[]>(data)

  // Use the first column as default if filterColumn is not provided
  const columnToFilter = filterColumn || (columns.length > 0 ? columns[0].id : undefined)

  // Memoize filter configuration to prevent infinite loops
  const filterConfig = useMemo(() => {
    if (filterOptions) {
      return filterOptions
    }
    if (contactTypes.length > 0) {
      return {
        key: "type",
        label: "type",
        values: contactTypes,
      }
    }
    return null
  }, [filterOptions, contactTypes])

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  })

  // Apply custom filters (type and date)
  useEffect(() => {
    let result = [...data]

    // Apply type/category filter
    if (typeFilter !== "all" && filterConfig) {
      result = result.filter((item: any) => item[filterConfig.key] === typeFilter)
    }

    // Apply date filter
    if (dateFilter) {
      const filterDate = new Date(dateFilter)
      filterDate.setHours(0, 0, 0, 0)

      result = result.filter((item: any) => {
        const itemDate = new Date(item.createdAt)
        itemDate.setHours(0, 0, 0, 0)
        return itemDate.getTime() === filterDate.getTime()
      })
    }

    setFilteredData(result)
  }, [data, typeFilter, dateFilter, filterConfig])

  // Function to export data to Excel
  const exportToExcel = () => {
    try {
      // Get the current filtered and sorted data
      const exportData = table.getRowModel().rows.map((row) => {
        const rowData: Record<string, any> = {}

        // Extract values from each cell
        columns.forEach((column) => {
          // Skip columns without an ID or with ID 'actions'
          const columnId = String(column.id || "")
          if (!columnId || columnId === "actions") {
            return
          }

          try {
            // Safely get the value for this cell
            const value = row.getValue(columnId)

            // Format dates if needed
            if (columnId === "createdAt" || columnId === "updatedAt") {
              rowData[columnId] = value ? format(new Date(value as string), "PPP") : ""
            } else {
              rowData[columnId] = value
            }
          } catch (error) {
            // If there's an error getting the value, use an empty string
            rowData[columnId] = ""
          }
        })

        return rowData
      })

      // Create worksheet
      const worksheet = XLSX.utils.json_to_sheet(exportData)

      // Create workbook
      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, worksheet, "Data")

      // Generate Excel file and trigger download
      XLSX.writeFile(workbook, `${exportFileName}.xlsx`)
    } catch (error) {
      console.error("Error exporting data:", error)
    }
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 py-4">
        <div className="flex-1">
          {columnToFilter && (
            <Input
              placeholder={`Search by ${filterColumn || "name"}...`}
              value={(table.getColumn(columnToFilter)?.getFilterValue() as string) ?? ""}
              onChange={(event) => table.getColumn(columnToFilter)?.setFilterValue(event.target.value)}
              className="max-w-sm"
            />
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {/* Type/Category filter */}
          {filterConfig && filterConfig.values.length > 0 && (
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={`Filter by ${filterConfig.label}`} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All {filterConfig.label}s</SelectItem>
                {filterConfig.values.map((value) => (
                  <SelectItem key={value} value={value}>
                    {value.charAt(0).toUpperCase() + value.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {/* Date filter */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn("w-[180px] justify-start text-left font-normal", !dateFilter && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateFilter ? format(dateFilter, "PPP") : "Filter by date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={dateFilter} onSelect={setDateFilter} initialFocus />
            </PopoverContent>
          </Popover>

          {/* Clear filters button */}
          {(typeFilter !== "all" || dateFilter) && (
            <Button
              variant="ghost"
              onClick={() => {
                setTypeFilter("all")
                setDateFilter(undefined)
              }}
            >
              Clear filters
            </Button>
          )}

          {/* Export button */}
          <Button variant="outline" className="flex items-center gap-2" onClick={exportToExcel}>
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Previous
        </Button>
        <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Next
        </Button>
      </div>
    </div>
  )
}
