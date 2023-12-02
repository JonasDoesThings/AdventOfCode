defmodule Day02.Part1 do
  def solve(input) do
    input
    |> String.split("\n", trim: true)
    |> Enum.with_index(1)
    |> Enum.map(&parse_line/1)
    |> Enum.sum()
  end

  def parse_line({line, game_id}) do
    line
    |> String.split(":")
    |> List.last()
    |> String.split([",", ";"])
    |> Enum.all?(
      fn colorstr ->
        [color_val, color_name] = String.split(colorstr, " ", trim: true)
        color_val = String.to_integer(color_val)

        case color_name do
          "red" -> color_val <= 12
          "green" -> color_val <= 13
          "blue" -> color_val <= 14
        end
      end
    )
    |> case do
      true -> game_id
      false -> 0
    end
  end
end

{:ok, input} = File.read("in.txt")

IO.puts("2/1:")
IO.puts(Day02.Part1.solve(input))
