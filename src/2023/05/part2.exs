defmodule Day05.Part2 do
  def solve(input) do
    mapping_tables_raw =
      input
      |> String.split("\n\n", trim: true)

    seeds =
      Enum.at(mapping_tables_raw, 0)
      |> String.trim_leading("seeds: ")
      |> String.split()
      |> Enum.map(&String.to_integer/1)
      |> Enum.chunk_every(2)
      |> Enum.sort()
      |> Enum.map(fn [num, length] -> num..(num + length - 1) end)

    mapping_tables =
      mapping_tables_raw
      |> Enum.map(fn table ->
        table
        |> String.split("\n", trim: true)
        |> Enum.drop(1)
        |> Enum.sort()
        |> Enum.map(fn row -> String.split(row) |> Enum.map(&String.to_integer/1) end)
        |> Enum.map(fn [dest_start, source_start, length] ->
          {dest_start..(dest_start + length - 1), source_start - dest_start}
        end)
      end)
      |> Enum.filter(fn l -> length(l) > 0 end)

    find_valid_result(0, seeds, mapping_tables)
  end

  defp find_valid_result(result, valid_seed_ranges, mapping_tables) do
    seed = map_dest_to_start(result, length(mapping_tables) - 1, mapping_tables)

    if Enum.any?(valid_seed_ranges, fn range -> seed in range end) do
      result
    else
      find_valid_result(result + 1, valid_seed_ranges, mapping_tables)
    end
  end

  defp map_dest_to_start(dest, index, mapping_tables) do
    mapping_table = Enum.at(mapping_tables, index)

    {_, offset} = Enum.find(mapping_table, {0, 0}, fn {range, _} -> dest in range end)

    if index == 0 do
      dest + offset
    else
      map_dest_to_start(dest + offset, index - 1, mapping_tables)
    end
  end
end

{:ok, input} = File.read("in.txt")

IO.puts("05/02:")
IO.puts(Day05.Part2.solve(input))
