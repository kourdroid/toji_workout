"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const ExerciseCard = ({ exercise }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold mb-2">{exercise.name}</h3>
            <div className="text-sm text-muted-foreground">
              <span className="inline-block px-2 py-1 rounded-md bg-primary/10 text-primary mr-2">
                {exercise.difficulty}
              </span>
              <span className="inline-block px-2 py-1 rounded-md bg-primary/10 text-primary">
                {exercise.category}
              </span>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{exercise.name}</DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-6">
          {/* Exercise Image */}
          <div className="relative w-full h-64 bg-accent/20 rounded-lg overflow-hidden">
            <Image
              src={exercise.image}
              alt={exercise.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Description */}
          <div>
            <h4 className="text-lg font-semibold mb-2">Description</h4>
            <p className="text-muted-foreground">{exercise.description}</p>
          </div>

          {/* Instructions */}
          <div>
            <h4 className="text-lg font-semibold mb-2">Instructions</h4>
            <ol className="list-decimal pl-4 space-y-2">
              {exercise.instructions.map((instruction, index) => (
                <li key={index} className="text-muted-foreground">
                  {instruction}
                </li>
              ))}
            </ol>
          </div>

          {/* Muscles Worked */}
          <div>
            <h4 className="text-lg font-semibold mb-2">Muscles Worked</h4>
            <div className="flex flex-wrap gap-2">
              {exercise.muscles.map((muscle, index) => (
                <span
                  key={index}
                  className="px-2 py-1 rounded-md bg-primary/10 text-primary text-sm"
                >
                  {muscle}
                </span>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div>
            <h4 className="text-lg font-semibold mb-2">Tips</h4>
            <ul className="list-disc pl-4 space-y-2">
              {exercise.tips.map((tip, index) => (
                <li key={index} className="text-muted-foreground">
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExerciseCard;
