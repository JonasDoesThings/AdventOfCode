defmodule Day05.Part1 do
  def solve(input) do
    mapping_tables =
      input
      |> String.split("\n\n", trim: true)

    seeds =
      Enum.at(mapping_tables, 0)
      |> String.trim_leading("seeds: ")
      |> String.split()
      |> Enum.map(&String.to_integer/1)

    map_input(seeds, 1, mapping_tables)
    |> Enum.min()
  end

  def map_input(input_to_map, index, mapping_tables) do
    ranges =
      Enum.at(mapping_tables, index)
      |> String.split("\n")
      |> Enum.drop(1)
      |> Enum.map(fn range_str ->
        [dest_start, source_start, length] =
          String.split(range_str) |> Enum.map(&String.to_integer/1)

        {source_start, source_start + length - 1, dest_start - source_start}
      end)

    mapped_output =
      input_to_map
      |> Enum.map(fn num ->
        {_, _, offset} =
          Enum.find(
            ranges,
            {0, 0, 0},
            fn {source_start, source_end, _} ->
              num >= source_start && num <= source_end
            end
          )

        num + offset
      end)

    if index < length(mapping_tables) - 1 do
      map_input(mapped_output, index + 1, mapping_tables)
    else
      mapped_output
    end
  end
end

{:ok, input} = File.read("in.txt")

IO.puts("05/01:")
IO.puts(Day05.Part1.solve(input))
