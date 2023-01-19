<?php

namespace Tests\Feature;

use App\Http\Resources\HabitResource;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Habit;
use Illuminate\Http\Request;

class HabitsTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_habits_view_can_be_rendered()
    {
        // Act
        $response = $this->withoutExceptionHandling()->get('/habits');

        // Assert
        $response->assertStatus(200);
    }

    public function test_habits_list_is_fetched()
    {
        // Arrange
        Habit::factory(3)->create();        
        $habitResource = HabitResource::collection(Habit::withCount('executions')->get());
        $request = Request::create('/api/habits', 'GET');

        // Act
        $response = $this->getJson('/api/habits');

        // Assert
        $response->assertStatus(200)->assertJson(
            $habitResource->response($request)->getData(true)
        );
    }

    public function test_habits_can_be_created()
    {
        // Arrange
        $habit = Habit::factory()->make();

        // Act
        $response = $this->withoutExceptionHandling()->postJson('/api/habits', $habit->toArray());

        // Assert
        $response->assertStatus(200);
        $this->assertDatabaseHas('habits', $habit->toArray());
    }

    public function test_habits_are_fetched_after_habit_is_created()
    {
        // Arrange
        $habit = Habit::factory()->make();
        $request = Request::create('/api/habits', 'POST');
        
        // Act
        $response = $this->withoutExceptionHandling()->postJson('/api/habits', $habit->toArray());
        
        // Assert
        $habitResource = HabitResource::collection(Habit::withCount('executions')->get());
        
        $this->assertDatabaseHas('habits', $habit->toArray());
        
        $response->assertStatus(200)->assertJson(
            $habitResource->response($request)->getData(true)
        );
    }

    public function test_habits_can_be_updated()
    {
        $habit = Habit::factory()->create();
        $updatedHabit = [
            'name' => 'updated',
            'times_per_day' => 4
        ];
        $request = Request::create("/api/habits/{$habit->id}", 'PUT');

        $response = $this->withoutExceptionHandling()->putJson("/api/habits/{$habit->id}", $updatedHabit);

        $habitResource = HabitResource::collection(Habit::withCount('executions')->get());
        $this->assertDatabaseHas('habits', ['id' => $habit->id, ...$updatedHabit]);
        $response->assertStatus(200)->assertJson(
            $habitResource->response($request)->getData(true)
        );;
    }

    /**
     * @dataProvider provideBadHabitData
     */
    public function test_create_habit_validation($missing, $habit)
    {
        $response = $this->postJson('/api/habits', $habit);
        $response->assertJsonValidationErrors($missing);
    }

    /**
     * @dataProvider provideBadHabitData
     */
    public function test_update_habit_validation($missing, $habit)
    {
        $habitId = Habit::factory()->create()->id;

        $response = $this->putJson("/api/habits/{$habitId}", $habit);
        $response->assertJsonValidationErrors($missing);
    }

    public function test_habits_can_be_deleted()
    {
        $habitId = Habit::factory()->create()->id;
        $request = Request::create("/api/habits/{$habitId}", 'DELETE');

        $response = $this->withoutExceptionHandling()->deleteJson("/api/habits/{$habitId}");

        $this->assertDatabaseMissing('habits', [
            'id' => $habitId
        ]);
        $habitResource = HabitResource::collection(Habit::withCount('executions')->get());
        $response->assertStatus(200)->assertJson(
            $habitResource->response($request)->getData(true)
        );
    }

    public function provideBadHabitData()
    {
        $habit = Habit::factory()->make();
        return [
            'missing name' => [
                'name',
                [
                    ...$habit->toArray(),
                    'name' => null,
                ]
            ],
            'missing times_per_day' => [
                'times_per_day',
                [
                    ...$habit->toArray(),
                    'times_per_day' => null
                ]
            ]
        ];
    }
}
