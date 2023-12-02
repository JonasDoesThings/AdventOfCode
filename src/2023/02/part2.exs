defmodule Day02.Part2 do
  def solve(input) do
    input
    |> String.split("\n", trim: true)
    |> Enum.map(&parse_line/1)
    |> Enum.sum()
  end

  def parse_line(line) do
    line
    |> String.split(":")
    |> List.last()
    |> String.split([",", ";"])
    |> Enum.reduce(
      %{},
      fn colorstr, colors ->
        [color_val, color_name] = String.split(colorstr, " ", trim: true)
        color_val = String.to_integer(color_val)

        if color_val > Map.get(colors, color_name, 0) do
          colors = Map.put(colors, color_name, color_val)
        else
          colors
        end
      end
    )
    |> Map.values()
    |> Enum.product()
  end
end

{:ok, input} = File.read("in.txt")

IO.puts("2/2:")
IO.puts(Day02.Part2.solve(input))
